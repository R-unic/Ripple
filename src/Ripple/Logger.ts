import { Message } from "discord.js";
import Ripple from "./Client";

export class RippleLogger {
    public constructor(
        private client: Ripple
    ) {}

    public DatabaseError(msg: Message, errorMsg?: string): Promise<Message> {
        return this.Error(msg, errorMsg ?? "There was an error with the database.");
    }

    public MissingArgError(msg: Message, argName: string): Promise<Message> {
        return this.Error(msg, `Missing argument "${argName}".`);
    }

    private Error(msg: Message, errorMsg: string): Promise<Message> {
        return msg.reply(
            this.client.Embed()
                .setTitle("Error! ❌")
                .setDescription(errorMsg)
                .setColor("#D9210D")
        );
    }
}
