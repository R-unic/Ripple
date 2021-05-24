import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "commandcount";
        super(name, {
            aliases: [name, "cmdcount", "cc"],
            description: "Returns the amount of commands Ripple has implemented."
        });
    }

    public async exec(msg: Message) {
        const client = this.client as RippleClient;
        return msg.channel.send(`Ripple has ${client.CommandCount} commands implemented.`);
    }
}