import { log } from "console";
import { User } from "discord.js";
import { HeadersInit } from "node-fetch";
import { EndpointType } from "./EndpointType";
import { Endpoint } from "./Endpoint";
import { Donation } from "./Donation";
import { NewDonationRes } from "./NewDonationRes";
import { ProcessTransactionErrorRes } from "./ProcessTransactionErrorRes";
import { Request } from "../Request";
import { StripISO } from "../../Util";
import Ripple from "../../Client";
import ms from "ms";

export class DonationAPI {
    private newDonation = new Endpoint("new", EndpointType.NewDonation);
    private processTransaction = new Endpoint("{txnID}/mark", EndpointType.ProcessTransaction);

    public constructor(
        private client: Ripple,
        private apiKey: string
    ) {}

    public async StartTransactionsLoop() {
        setTimeout(async () => await this.StartTransactionsLoop(), ms("5m"));

        const headers: HeadersInit = {
            Authorization: this.apiKey
        };

        const { donations } = await Request<NewDonationRes>(this.newDonation.URL(), headers);
        log(donations)
        donations.forEach(async dn => {
            log(dn)
            switch(dn.status) {
                case "Completed": {
                    this.client.Premium.Set(await this.GetBuyer(dn.buyer_id), true)
                        .then(success => log(`
                        Purchase successful, premium granted
                        Success: ${success}
                        `))
                        .catch(err => log(`
                        Purchase failed, premium maybe granted
                        Success: ${false}
                        Error: ${err}
                        `));
                    
                    const transaction = await Request<ProcessTransactionErrorRes>(this.processTransaction.URL(dn.txn_id), headers, "POST");
                    if (transaction.Error)
                        log(`Transaction processing error: ${transaction.Error}`);
                    else
                        log(`
                        Successfully processed transaction!
                        ID: ${dn.txn_id}
                        Timestamp: ${StripISO(dn.timestamp)}
                        Buyer: (
                            ID: ${dn.buyer_id}
                            Email: ${dn.buyer_email}
                        )
                        `);
                };

                case "Refunded":
                case "Reversed": await this.Refund(dn);
            }
        });
    }

    private async Refund(dn: Donation) {
        return this.client.Premium.Set(await this.GetBuyer(dn.buyer_id), false)
            .then(success => log(`
            Refund successful, premium revoked
            Success: ${success}
            `))
            .catch(err => log(`
            Refund failed, premium maybe revoked
            Success: ${false}
            Error: ${err}
            `));
    }

    private async GetBuyer(buyerID: string): Promise<User> {
        log(buyerID)
        return await this.client.users.fetch(buyerID, true, true);
    }
}