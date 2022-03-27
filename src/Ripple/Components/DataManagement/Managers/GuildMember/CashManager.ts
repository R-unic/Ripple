import { GuildMember } from "discord.js";
import { GuildMemberDataManager } from "../../Base/GuildMemberDataManager";
import Ripple from "../../../../Client";

export class CashManager implements GuildMemberDataManager<number> {
    public readonly Tag = "cash";
    
    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Get(user: GuildMember): Promise<number> {
        return this.Client.Get(user, this.Tag, 0, user.id);
    }

    public async Set(user: GuildMember, value: number): Promise<boolean> {
        return this.Client.Set(user, this.Tag, value, user.id);
    }

    public async Increment(user: GuildMember, amount: number): Promise<boolean> {
        return this.Set(user, await this.Get(user) + amount)
    }
}