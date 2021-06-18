import { Message } from "discord.js";
import { DataManager } from "./DataManager";

export abstract class MessageIDDataManager<T> extends DataManager {
    public abstract Get(m: string, defaultValue?: T): Promise<T>;
    public abstract Set(m: string, value: T): Promise<boolean>;
    public abstract Increment?(m: string, amount?: number): Promise<boolean>;
}