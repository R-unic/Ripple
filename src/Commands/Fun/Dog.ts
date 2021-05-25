import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";
import fetch from "node-fetch";

export default class extends Command {
    public constructor() {
        const name = "dog";
        super(name, {
            aliases: [name, "dogpicture", "dogpic", "puppy", "pooch"],
            description: "Returns a picture of a dog."
        });
    }

    public async exec(msg: Message) {
        const client = this.client as RippleClient;
        return msg.reply(
            client.Embed()
                .setTitle('🐶 Woof! 🐶')
                .setImage(await this.getImage(msg))
        );
    }

    private async getImage(msg: Message) {
        try {
            const res = await fetch("https://dog.ceo/api/breeds/image/random");
            return (await res.json()).message;
        } catch (err) {
            return msg.reply("Please try again momentarily. This could be an API error.");
        }
    }
}