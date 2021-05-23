import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class Ping extends Command {
    public constructor() {
        const name = "ping";
        super(name, {
            aliases: [name, "test"]
        });
    }

    public async exec(msg: Message) {
        return msg.reply("Pong!");
    }
}