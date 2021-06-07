import { Role } from "discord.js";
import Ripple from "../../../Client";

export abstract class GuildRoleDataManager<T> {
    public readonly Tag: string;

    public constructor(
        public readonly Client: Ripple
    ) {}

    public abstract Get(role: Role, defaultValue?: T): Promise<T>;
    public abstract Set(role: Role, value: T): Promise<boolean>;
    public abstract Increment?(role: Role, amount?: number): Promise<boolean>;
}