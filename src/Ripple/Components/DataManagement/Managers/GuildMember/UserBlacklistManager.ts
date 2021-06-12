import { GuildMember } from "discord.js";
import { GuildMemberDataManager } from "../../Base/GuildMemberDataManager";
import Ripple from "../../../../Client";

export class UserBlacklistManager implements GuildMemberDataManager<boolean> {
    public Tag = "userblacklist";

    public constructor(
        public Client: Ripple
    ) {}

    public Get(user: GuildMember): Promise<boolean> {
        return this.Client.Get(user, this.Tag, false, user.id);
    }

    public Set(user: GuildMember, value: boolean): Promise<boolean> {
        return this.Client.Get(user, this.Tag, value, user.id);
    }
}