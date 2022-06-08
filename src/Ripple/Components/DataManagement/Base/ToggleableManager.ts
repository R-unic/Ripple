import { GuildObject } from "../../../Util";
import { GuildDataManager } from "./GuildDataManager";
import Ripple from "../../../Client";

export class ToggleableManager implements GuildDataManager<boolean> {
    public constructor(
        public readonly Client: Ripple,
        public readonly Tag: string,
        public readonly DefaultValue: boolean
    ) {}

    public async Toggle(m: GuildObject): Promise<boolean> {
        const value = await this.Get(m);
        await this.Set(m, !value);
        return !value;
    }

    public async Get(m: GuildObject): Promise<boolean> {
        return this.Client.Get(m, this.Tag, this.DefaultValue);
    }

    public async Set(m: GuildObject, value: boolean): Promise<boolean> {
        return this.Client.Set(m, this.Tag, value);
    }
}