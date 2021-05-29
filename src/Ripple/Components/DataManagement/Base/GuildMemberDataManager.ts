import { GuildMember } from "discord.js";
import Ripple from "../../../Client";

export abstract class GuildMemberDataManager<T> {
    public readonly Tag: string;
    
    public constructor(
        public readonly Client: Ripple,
    ) {};

    public abstract Get(user: GuildMember, defaultValue?: T): Promise<T>;
    public abstract Set(user: GuildMember, value: T): Promise<boolean>;
    public abstract Increment?(user: GuildMember, amount?: number): Promise<boolean>;
}