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
                .setDescription("Ripple Premium gives you access to special, Premium-only commands. When you buy Premium, it's only a one time payment! Meaning no monthly fees, or worrying about a subscription. Just pay and you're on your way!")
                .setURL(this.client.DonateLink)
                .setThumbnail("https://images-ext-2.discordapp.net/external/q5LlY_OYbXfmwvQlE-lURkUnjwpVEyVtWxgmvDHOrAI/https/cdn.discordapp.com/avatars/404365332912930827/f4019aab26a764ed53ff3bb8c0b26d73.webp")
        );
    }
}