import { GuildObject } from "../../../Util";
import { GuildDataManager } from "./GuildDataManager";
import Ripple from "../../../Client";

export class ListManager<T> implements GuildDataManager<T[]> {
    public constructor(
        public readonly Client: Ripple,
        public readonly Tag: string,
        public readonly DefaultValue?: T[]
    ) {}

    public async Add(m: GuildObject, value: T): Promise<boolean> {
        const list = await this.Get(m);
        list.push(value);
        return this.Set(m, list);
    }

    public async Remove(m: GuildObject, value: T): Promise<boolean> {
        const list = await this.Get(m);
        return this.Set(m, list.filter(v => v === value ? undefined : v));
    }

    public async Get(m: GuildObject): Promise<T[]> {
        return this.Client.Get(m, this.Tag, this.DefaultValue?? []);
    }

    public async Set(m: GuildObject, value: T[]): Promise<boolean> {
        return this.Client.Set(m, this.Tag, value);
    }
}