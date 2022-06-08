import { GuildMember } from "discord.js";
import { CurrencyManager } from "../../Base/CurrencyManager";
import Ripple from "../../../../Client";

export class CashManager extends CurrencyManager {    
    public constructor(
        public readonly Client: Ripple
    ) {
        super(Client, "cash");
    }

    public async Decrement(user: GuildMember, amount: number): Promise<boolean> {
        amount = Math.abs(amount);
        const extra = await this.Get(user) - amount;
        if (extra < 0) {
            if (await this.Client.Bank.Get(user) < extra)
                return true; //prolly change
            else {
                await this.Increment(user, -amount + extra, true);
                return await this.Client.Bank.Increment(user, -extra, true);
            }
        } else {
            return await this.Increment(user, -amount, true);
        }
    }
}