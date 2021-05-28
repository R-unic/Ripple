import { Message } from "discord.js";
import { ErrorLogger } from "./ErrorLogger";
import Ripple from "../Client";

export class RippleLogger {
    private readonly errorLogger = new ErrorLogger;

    public constructor(
        private client: Ripple
    ) {}

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
        return this.Error(msg, `Missing argument: "${argName}".`);
    }

    private Error(msg: Message, errorMsg: string, log?: boolean): Promise<Message> {
        if (log)
            this.errorLogger.ReportError(errorMsg);
        return msg.reply(
            this.client.Embed()
                .setTitle("Error! ❌")
                .setDescription(errorMsg)
                .setColor("#D9210D")
        );
    }
}
