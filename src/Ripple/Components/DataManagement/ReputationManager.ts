import { GuildMember } from "discord.js";
import Ripple from "../../Client";
import { MemberDataManager } from "./Base/MemberDataManager";

export class ReputationManager implements MemberDataManager<number> {
    public Tag = "reputation";

    public constructor(
        public Client: Ripple
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