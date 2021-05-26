import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "npm";
        super(name, {
            aliases: [name, "npmpackage", "npmpkg"],
            description: "Returns Ripple's NPM package link."
        });
    }

    public async exec(msg: Message) {
        const client = this.client as RippleClient;
        return msg.reply(
            client.Embed()
                .setTitle("ripple-discord-ts")
                .setURL("https://www.npmjs.com/package/ripple-discord-ts")
                .setThumbnail("https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png")
        );
    }
}