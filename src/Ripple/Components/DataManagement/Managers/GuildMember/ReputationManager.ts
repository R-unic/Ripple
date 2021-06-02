import { GuildMember } from "discord.js";
import { GuildMemberDataManager } from "../../Base/GuildMemberDataManager";
import Ripple from "../../../../Client";

export class ReputationManager implements GuildMemberDataManager<number> {
    public Tag = "reputation";

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Get(user: GuildMember) {
        return this.Client.Get(user, this.Tag, 0, user.id);
    }

    public async Set(user: GuildMember, value: number) {
        return this.Client.Set(user, this.Tag, value, user.id);
    }

    public async Increment(user: GuildMember, amount: number = 1) {
        return this.Set(user, await this.Get(user) + amount);
    }
}