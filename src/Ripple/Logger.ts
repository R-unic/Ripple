import { Message } from "discord.js";
import Ripple from "./Client";

/** 
 * @class Error Logger
 * @description Stores an array of errors that can be manipulated or added to.
*/
class ErrorLogger {
    public readonly Log: Error[] = [];

    /**
     * @method ClearLog
     * @description Clear the error log
    */
    public ClearLog() {
        this.Log.forEach(() => this.Log.pop());
    }

    /**
     * @method ReportError
     * @description Throw & catch an error then log it
     * @param errorMsg 
     * @returns Index of error inside of log array
    */
    public ReportError(errorMsg: string): number {
        try {
            throw new Error(`Error: ${errorMsg}`);
        } catch (err) {
            return this.Log.push(err);
        }
    }
}

export class RippleLogger {
    private errorLogger = new ErrorLogger;

    public constructor(
        private client: Ripple
    ) {}

    public APIError(msg: Message, errorMsg?: string): Promise<Message> {
        return this.Error(msg, errorMsg ?? "There was an error with the API.");
    }

    public DatabaseError(msg: Message, errorMsg?: string): Promise<Message> {
        return this.Error(msg, errorMsg ?? "There was an error with the database.");
    }

    public MissingArgError(msg: Message, argName: string): Promise<Message> {
        return this.Error(msg, `Missing argument "${argName}".`);
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
