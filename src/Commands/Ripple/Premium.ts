import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Ripple/Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "premium";
        super(name, {
            aliases: [name, "ripplepremium", "donate", "getpremium"],
            description: "Returns a donation link to purchase Ripple Premium."
        });
    }

    public async exec(msg: Message) {
        return msg.reply(
            this.client.Embed("Donate! 💰")
                .setURL(this.client.DonateLink)
        );
    }
}