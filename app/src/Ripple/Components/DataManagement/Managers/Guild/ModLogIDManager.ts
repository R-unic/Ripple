import { GuildObject } from "../../../../Util";
import { GuildDataManager } from "../../Base/GuildDataManager";
import Ripple from "../../../../Client";

export class ModLogIDManager implements GuildDataManager<number> {
    public Tag = "modlogid";

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Get(m: GuildObject): Promise<number> {
        return this.Client.Get(m, this.Tag, 1);
    }

    public async Set(m: GuildObject, value: number): Promise<boolean> {
        return this.Client.Set(m, this.Tag, value);
    }
    
    public async Increment(m: GuildObject, amount?: number): Promise<boolean> {
        return this.Set(m, (await this.Get(m)) + (amount?? 1));
    }
}