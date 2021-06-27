import { GuildObject } from "../../../Util";
import { DataManager } from "./DataManager";

export abstract class GuildDataManager<T> extends DataManager {
    public abstract Get(m: GuildObject, defaultValue?: T): Promise<T>;
    public abstract Set(m: GuildObject, value: T): Promise<boolean>;
    public abstract Increment?(m: GuildObject, amount?: number): Promise<boolean>;
}