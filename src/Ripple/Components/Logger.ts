import { Message } from "discord.js";
import { ErrorLogger } from "./ErrorLogger";
import Ripple from "../Client";

export class RippleLogger {
    private readonly errorLogger = new ErrorLogger;

    public constructor(
        private client: Ripple
    ) {}

    public get Collection() {
        return this.errorLogger.Log;
    }

    public get ErrorCount() {
        return this.Collection.size;
    }

    /**
     * @description Clear the error log
    */
    public Clear() {
        this.errorLogger.ClearLog();
    }

    public NoPremiumError(msg: Message): Promise<Message> {
        return this.Error(msg, `This command is Premium-only! If you would like to purchase Ripple Premium, visit [here](${this.client.DonateLink}). Only a one-time payment of USD$10!`);
    }

    public DiscordAPIError(msg: Message, err: Error | string): Promise<Message> {
        return this.Error(msg, `Discord API Error: ${typeof err === "string" ? err : err.message}`);
    }

    public InvalidArgError(msg: Message, errorMsg: string): Promise<Message> {
        return this.Error(msg, `Invalid Argument: ${errorMsg}`);
    }

    public APIError(msg: Message, errorMsg?: string): Promise<Message> {
        return this.Error(msg, `API Error: ${errorMsg ?? "There was an error with the API."}`);
    }

    public DatabaseError(msg: Message, errorMsg?: string): Promise<Message> {
        return this.Error(msg, `Database Error: ${errorMsg ?? "There was an error with the database."}`);
    }

    public MissingArgError(msg: Message, argName: string): Promise<Message> {
        return this.Error(msg, `Missing required argument: "${argName}"`);
    }

    private async Error(msg: Message, errorMsg: string, log: boolean = true): Promise<Message> {
        if (log)
            this.errorLogger.Report(errorMsg, msg.createdAt);

        return msg.reply(
            this.client.Embed("Error! ❌")
                .setDescription(errorMsg)
                .setColor("#D9210D")
        );
    }
}
