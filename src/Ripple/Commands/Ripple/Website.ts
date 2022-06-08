import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "website";
        super(name, {
            aliases: [name, "ripplewebsite", "homepage"],
            description: "Returns the link to Ripple's website."
        });
    }

    public async exec(msg: Message) {
        return msg.reply(
            this.client.Embed()
                .setTitle("Ripple Website")
                .setDescription("An all-purpose Discord bot built with TypeScript")
                .setURL("https://alpharunic.github.io/Ripple")
        );
    }
}