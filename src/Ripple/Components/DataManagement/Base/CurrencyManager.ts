import { GuildMember } from "discord.js";
import { GuildMemberDataManager } from "./GuildMemberDataManager";
import Ripple from "../../../Client";
import { Clamp } from "../../../Util";

export class CurrencyManager implements GuildMemberDataManager<number> {    
    public constructor(
        public readonly Client: Ripple,
        public readonly Tag: string
    ) {}

    public async TotalMoney(user: GuildMember): Promise<number> {
        return await this.Client.Cash.Get(user) + await this.Client.Bank.Get(user);
    }

    public async Get(user: GuildMember): Promise<number> {
        return this.Client.Get(user, this.Tag, 0, user.id);
    }

    public async Set(user: GuildMember, value: number): Promise<boolean> {
        return this.Client.Set(user, this.Tag, Clamp(value), user.id);
    }

    public async Increment(user: GuildMember, amount: number, sub?: boolean): Promise<boolean> {
        amount = sub ? -Math.abs(amount) : Math.abs(amount);
        return this.Set(user, await this.Get(user) + amount)
    }
}