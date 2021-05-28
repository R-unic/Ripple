import { GuildObject } from "../../../Util";
import Ripple from "../../../Client";

export abstract class GuildDataManager<T> {
    public readonly Tag: string;

    public constructor(
        public readonly Client: Ripple
    ) {}

    public abstract Get(m: GuildObject, defaultValue?: T): Promise<T>;
    public abstract Set(m: GuildObject, value: T): Promise<boolean>;
    public abstract Increment?(m: GuildObject, amount?: number): Promise<boolean>;
}