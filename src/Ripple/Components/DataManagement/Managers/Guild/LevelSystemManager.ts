import { GuildObject } from "../../../../Util";
import { GuildDataManager } from "../../Base/GuildDataManager";
import Ripple from "../../../../Client";

export class LevelSystemManager implements GuildDataManager<boolean> {
    public readonly Tag = "levelsystem";

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Get(m: GuildObject): Promise<boolean> {
        return this.Client.Get(m, this.Tag, true);
    }

    public async Set(m: GuildObject, value: boolean): Promise<boolean> {
        return this.Client.Set(m, this.Tag, value);
    }
}