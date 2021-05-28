import { Message } from "discord.js";
import Ripple from "./Client";
import { ErrorLogger } from "./ErrorLogger";

export class RippleLogger {
    private errorLogger = new ErrorLogger;

    public constructor(
        private client: Ripple
    ) {}

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
