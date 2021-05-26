import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "website";
        super(name, {
            aliases: [name, "ripplewebsite"],
            description: "Returns the link to Ripple's website."
        });
    }

    public async exec(msg: Message) {
        const client = this.client as RippleClient;
        return msg.reply(
            client.Embed()
                .setTitle("Ripple Website")
                .setDescription("An all-purpose Discord bot built with TypeScript")
                .setURL("https://alpharunic.github.io/Ripple")
        );
    }
}