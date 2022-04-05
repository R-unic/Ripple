import { GuildMember } from "discord.js";
import { CurrencyManager } from "../../Base/CurrencyManager";
import Ripple from "../../../../Client";

export class BankManager extends CurrencyManager {    
    public constructor(
        public readonly Client: Ripple
    ) {
        super(Client, "bank");
    }

    public async Decrement(user: GuildMember, amount: number): Promise<boolean> {
        amount = Math.abs(amount);
        const extra = await this.Get(user) - amount;
        if (extra < 0) {
            if (await this.Client.Cash.Get(user) < extra)
                return true; //prolly change
            else {
                await this.Increment(user, -amount + extra, true);
                return await this.Client.Cash.Increment(user, -extra, true);
            }
        } else {
            return await this.Increment(user, -amount, true);
        }
    }
}