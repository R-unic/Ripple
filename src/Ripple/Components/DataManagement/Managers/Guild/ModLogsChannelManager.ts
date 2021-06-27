import { GuildObject } from "../../../../Util";
import { GuildDataManager } from "../../Base/GuildDataManager";
import Ripple from "../../../../Client";

export class ModLogsChannelManager implements GuildDataManager<string> {
    public Tag = "modlogschannel";

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Get(m: GuildObject): Promise<string> {
        return this.Client.Get<string>(m, this.Tag, m.guild.channels.cache.random().id);
    }

    public async Set(m: GuildObject, value: string): Promise<boolean> {
        return this.Client.Set(m, this.Tag, value);
    }
}