import { Message } from "discord.js";
import { ErrorLogger } from "./ErrorLogger";
import Ripple from "../Client";

export class RippleLogger {
    public readonly ErrorLogger = new ErrorLogger;

    public constructor(
        private client: Ripple
    ) {}

    public get Collection() {
        return this.ErrorLogger.Log;
    }

    public get ErrorCount() {
        return this.Collection.size;
    }

    /**
     * @description Clear the error log
    */
    public Clear() {
        this.ErrorLogger.ClearLog();
    }

    public CouldNotBeExecuted(msg: Message, errorMsg: string): Promise<Message> {
        return this.Error(msg, `Command Could Not Be Executed: ${errorMsg}`);
    }

    public LevelSystemError(msg: Message, errorMsg: string): Promise<Message> {
        return this.Error(msg, `Level System Error: ${errorMsg}`);
    }

    public UtilError(msg: Message, errorMsg?: string): Promise<Message> {
        return this.Error(msg, `Util Error: ${errorMsg?? "There was a problem with an internal utility function."}`);
    }

    public NoPremiumError(msg: Message): Promise<Message> {
        return this.Error(msg, `This command is Premium-only! If you would like to purchase Ripple Premium, visit [here](${this.client.DonateLink}). Only a one-time payment of USD$10!`);
    }

    public DiscordAPIError(msg: Message, err: Error | string): Promise<Message> {
        return this.Error(msg, `Discord API Error: ${typeof err === "string" ? err : err.message}`);
    }

    public InvalidArgError(msg: Message, errorMsg: string): Promise<Message> {
        return this.Error(msg, `Invalid Argument Error: ${errorMsg}`);
    }

    public APIError(msg: Message, errorMsg?: string): Promise<Message> {
        return this.Error(msg, `API Error: ${errorMsg?? "Please try again momentarily. This could be an API error."}`);
    }

    public DatabaseError(msg: Message, errorMsg?: string): Promise<Message> {
        return this.Error(msg, `Database Error: ${errorMsg?? "There was an error with the database."}`);
    }

    public async MissingArgError(msg: Message, argName: string): Promise<Message> {
        const prefix = await this.client.Prefix.Get(msg);
        return this.Error(msg, `
        Missing Required Argument Error: "${argName}"
        Command requires argument named "${argName}" which was omitted.
        Try using \`${prefix}help\` or \`${prefix}usage <commandName>\`.
        `);
    }

    private async Error(msg: Message, errorMsg: string, log: boolean = true): Promise<Message> {
        if (log)
            this.ErrorLogger.Report(errorMsg, msg.createdAt);

        return msg.reply(
            this.client.Embed("Error! ❌")
                .setDescription(errorMsg)
                .setColor("#D9210D")
        );
    }
}
