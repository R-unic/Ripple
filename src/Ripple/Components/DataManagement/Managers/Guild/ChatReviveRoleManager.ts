import { GuildObject } from "../../../../Util";
import { GuildDataManager } from "../../Base/GuildDataManager";
import Ripple from "../../../../Client";

export class ChatReviveRoleManager implements GuildDataManager<string> {
    public readonly Tag = "chatreviverole";

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Get(m: GuildObject): Promise<string> {
        return this.Client.Get(m, this.Tag, m.guild.roles.everyone.id);
    }

    public async Set(m: GuildObject, value: string): Promise<boolean> {
        return this.Client.Set(m, this.Tag, value);
    }
}