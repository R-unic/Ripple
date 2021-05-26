import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Ripple/Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "yesorno";
        super(name, {
            aliases: [name, "yesno", "yn"],
            description: "Returns either 'Yes' or 'No'."
        });
    }

    public async exec(msg: Message) {
        const num = Math.floor(Math.random() * 2);
        return msg.reply(
            this.client.Embed()
                .setTitle("✅ Yes Or No ❌")
                .setDescription(`Your answer: ${num === 1 ? "Yes" : "No"}.`)
        );
    }
}