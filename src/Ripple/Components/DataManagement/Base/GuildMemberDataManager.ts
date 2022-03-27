import { GuildMember } from "discord.js";
import { DataManager } from "./DataManager";

export abstract class GuildMemberDataManager<T> extends DataManager {
    public abstract Get(user: GuildMember, defaultValue?: T): Promise<T>;
    public abstract Set(user: GuildMember, value: T): Promise<boolean>;
    public abstract Increment?(user: GuildMember, amount: number): Promise<boolean>;
}