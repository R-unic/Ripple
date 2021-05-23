import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class Sudo extends Command {
    public constructor() {
        const name = "sudo";
        super(name, {
            aliases: [name, "say", "repeat", "echo"],
            args: [
                {
                    id: "message",
                    type: "string"
                }
            ]
        });
    }

    public async exec(msg: Message, args) {
        msg.channel.send(args.message);
        return msg.delete();
    }
}