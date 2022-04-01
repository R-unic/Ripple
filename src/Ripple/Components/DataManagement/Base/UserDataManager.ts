import { User } from "discord.js";
import Ripple from "../../../Client";

export abstract class UserDataManager<T> {
    public readonly Tag: string;
    
    public constructor(
        public readonly Client: Ripple,
    ) {};

    public abstract Has(user: User, defaultValue?: T): Promise<T>;
    public abstract Set(user: User, value: T): Promise<boolean>;
    public abstract Increment?(user: User, amount?: number): Promise<boolean>;
}