import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Ripple/Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "commandcount";
        super(name, {
            aliases: [name, "cmdcount", "cc"],
            description: "Returns the amount of commands Ripple has implemented."
        });
    }

    public async exec(msg: Message) {
        return msg.channel.send(`Ripple has ${this.client.CommandCount} commands implemented.`);
    }
}