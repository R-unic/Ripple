import { TextChannel } from "discord.js";
import { DataManager } from "./DataManager";

export abstract class GuildChannelDataManager<T> extends DataManager {
    public abstract Get(channel: TextChannel, defaultValue?: T): Promise<T>;
    public abstract Set(channel: TextChannel, value: T): Promise<boolean>;
    public abstract Increment?(channel: TextChannel, amount?: number): Promise<boolean>;
}