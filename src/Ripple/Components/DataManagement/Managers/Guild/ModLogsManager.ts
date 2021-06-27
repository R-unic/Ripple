import { GuildObject } from "../../../../Util";
import { GuildDataManager } from "../../Base/GuildDataManager";
import Ripple from "../../../../Client";

export class ModLogsManager implements GuildDataManager<boolean> {
    public readonly Tag = "modlogs";

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Get(m: GuildObject): Promise<boolean> {
        return this.Client.Get(m, this.Tag, false);
    }

    public async Set(m: GuildObject, value: boolean): Promise<boolean> {
        return this.Client.Set(m, this.Tag, value);
    }
}