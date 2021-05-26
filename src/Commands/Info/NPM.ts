import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Ripple/Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "npm";
        super(name, {
            aliases: [name, "npmpackage", "npmpkg"],
            description: "Returns Ripple's NPM package link."
        });
    }

    public async exec(msg: Message) {
        return msg.reply(
            this.client.Embed()
                .setTitle("ripple-discord-ts")
                .setURL("https://www.npmjs.com/package/ripple-discord-ts")
                .setThumbnail("https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png")
        );
    }
}