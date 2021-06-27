import { Role } from "discord.js";
import { DataManager } from "./DataManager";

export abstract class GuildRoleDataManager<T> extends DataManager {
    public abstract Get(role: Role, defaultValue?: T): Promise<T>;
    public abstract Set(role: Role, value: T): Promise<boolean>;
    public abstract Increment?(role: Role, amount?: number): Promise<boolean>;
}