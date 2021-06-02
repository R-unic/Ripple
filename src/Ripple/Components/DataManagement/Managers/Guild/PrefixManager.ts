import { GuildObject } from "../../../../Util";
import { GuildDataManager } from "../../Base/GuildDataManager";
import Ripple from "../../../../Client";

export class PrefixManager implements GuildDataManager<string> {
    public Tag = "prefix";

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Get(m: GuildObject, defaultValue: string = this.Client.DefaultPrefix): Promise<string> {
        return this.Client.Get<string>(m, this.Tag, defaultValue);
    }

    public async Set(m: GuildObject, newPrefix: string): Promise<boolean> {
        return this.Client.Set(m, this.Tag, newPrefix);
    }
}