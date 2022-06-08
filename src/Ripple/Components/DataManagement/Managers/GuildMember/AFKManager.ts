import { GuildMember } from "discord.js";
import { GuildMemberDataManager } from "../../Base/GuildMemberDataManager";
import { Status } from "../../../DataInterfaces/Status";
import Ripple from "../../../../Client";

export class AFKManager implements GuildMemberDataManager<Status> {
    public readonly Tag = "afk";
    public readonly Default = { AFK: false, Message: undefined };

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Is(user: GuildMember): Promise<boolean> {
        const status = await this.Get(user);
        return status.AFK;
    }

    public async Cancel(user: GuildMember): Promise<boolean> {
        return this.Set(user, this.Default);
    }

    public async Get(user: GuildMember): Promise<Status> {
        return this.Client.Get(user, this.Tag, this.Default);
    }

    public async Set(user: GuildMember, value: Status): Promise<boolean> {
        return this.Client.Set(user, this.Tag, value);
    }
}