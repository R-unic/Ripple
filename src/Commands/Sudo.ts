import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class Sudo extends Command {
    public constructor() {
        const name = "sudo";
        super(name, {
            aliases: [name, "say", "repeat", "echo"],
            description: "Repeats the message provided.",
            category: "Fun",
            args: [
                {
                    id: "message",
                    type: "string"
                }
            ]
        });
    }

    public async exec(msg: Message, args) {
        if (args.message) {
            msg.channel.send(args.message);
            return msg.delete();
        }
    }
}