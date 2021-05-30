import { log } from "console";
import { User } from "discord.js";
import { HeadersInit } from "node-fetch";
import { Request } from "../Request";
import { StripISO } from "../../Ripple/Util";
import Ripple from "../../Ripple/Client";
import ms from "ms";

export enum EndpointType {
    NewDonation,
    ProcessTransaction
}

class Endpoint {
    public static readonly BaseURL = "https://donatebot.io/api/v1/donations/846604279288168468";

    public constructor(
        public Path: string,
        public Type: EndpointType
    ) {}

    public URL(txnID?: string): string {
        const path = this.Path;
        if (path.includes("{txnID}"))
            if (!txnID)
                log("No transaction ID found when attempting to get ProcessTransaction endpoint URL");
            else
                path.replace(/{txnID}/, txnID);

        return `${Endpoint.BaseURL}/${path}`;
    }
}

interface Donation {
    txn_id: string;
    status: "Completed" | "Refunded" | "Reversed";
    buyer_email: string;
    buyer_id: string;
    recurring: boolean;
    price: string;
    currency: string;
    timestamp: string;
}

interface NewDonationRes {
    donations: readonly Donation[];
}

interface ProcessTransactionErrorRes {
    Error?: string;
}

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
            "Authorization": this.apiKey
        };

        const { donations } = await Request<NewDonationRes>(this.newDonation.URL(), headers);
        donations.forEach(async dn => {
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
        return await this.client.users.fetch(buyerID, true, true);
    }
}