import { GuildObject } from "../../../Util";
import { GuildDataManager } from "../Base/GuildDataManager";
import Ripple from "../../../Client";

export class AutoRoleManager implements GuildDataManager<string> {
    public Tag = "autorole";

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Get(m: GuildObject): Promise<string> {
        return this.Client.Get<string>(m, this.Tag);
    }

    public async Set(m: GuildObject, value: string): Promise<boolean> {
        return this.Client.Set(m, this.Tag, value);
    }
}