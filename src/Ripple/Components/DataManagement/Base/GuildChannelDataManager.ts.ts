import { TextChannel } from "discord.js";
import Ripple from "../../../Client";

export abstract class GuildChannelDataManager<T> {
    public readonly Tag: string;

    public constructor(
        public readonly Client: Ripple
    ) {}

    public abstract Get(channel: TextChannel, defaultValue?: T): Promise<T>;
    public abstract Set(channel: TextChannel, value: T): Promise<boolean>;
    public abstract Increment?(channel: TextChannel, amount?: number): Promise<boolean>;
}