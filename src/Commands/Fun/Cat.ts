import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";
import fetch from "node-fetch";
import { StripISO } from "../../Ripple/Util";

export default class extends Command {
    public constructor() {
        const name = "cat";
        super(name, {
            aliases: [name, "kittycat", "kitten", "kitty", "meow"],
            description: "Returns a picture of a cat."
        });
    }

    public async exec(msg: Message) {
        const client = this.client as RippleClient;
        const res = ((await this.requestAPI(msg)) as { img: string, date: string })
        return msg.reply(
            client.Embed()
                .setTitle('🐶 Meow! 🐶')
                .setAuthor(res.date)
                .setImage(res.img)
        );
    }

    private async requestAPI(msg: Message) {
        try {
            const base = "https://cataas.com";
            const res = await (await fetch(base + "/cat?json=true")).json();
            return {
                img: base + res.url,
                date: StripISO(res.created_at)
            };
        } catch (err) {
            return msg.reply("Please try again momentarily. This could be an API error.");
        }
    }
}