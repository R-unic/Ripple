import { log } from "console";
import { User } from "discord.js";
import { HeadersInit } from "node-fetch";
import { EndpointType } from "./EndpointType";
import { Endpoint } from "./Endpoint";
import { Donation } from "./Donation";
import { NewDonationRes } from "./NewDonationRes";
import { Request } from "../Request";
import Ripple from "../../Client";
import ms from "ms";

export class DonationAPI {
    private newDonation = new Endpoint("new", EndpointType.NewDonation);
    private processTransaction = new Endpoint("mark", EndpointType.ProcessTransaction);

    public constructor(
        private readonly client: Ripple,
        private readonly apiKey: string
    ) {}

    public async StartTransactionsLoop() {
        setTimeout(async () => await this.StartTransactionsLoop(), ms("5m"));

        const headers: HeadersInit = {
            Authorization: this.apiKey
        };

        const { donations } = await Request.GetJSON<NewDonationRes>(this.newDonation.URL(), headers);
        donations.forEach(async dn => {
            if (dn.status === "Completed") {
                this.client.Premium.Set(await this.GetBuyer(dn.buyer_id), true)
                        .then(success => log(`
Purchase successful, premium granted
Success: ${success}
`))
                        .catch(err => log(`
Purchase failed, premium maybe granted
Success: ${false}
Error: ${err}`));
                    
                const transactionStatus = await Request.Post(this.processTransaction.URL(dn.txn_id), headers);
                if (transactionStatus !== "OK")
                    log(`Error processing transaction, status: ${transactionStatus}`);
                else
                    log(`
Transaction Status: ${transactionStatus}
Transaction ID: ${dn.txn_id}
Timestamp: ${dn.timestamp}
Buyer: (
    ID: ${dn.buyer_id}
    Email: ${dn.buyer_email}
)`);
            } else if (dn.status === "Refunded" || dn.status === "Reversed")
                return await this.Refund(dn);
            else
                log("status", dn.status);
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