import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "yesorno";
        super(name, {
            aliases: [name, "yesno", "yn"],
            description: "Returns either 'Yes' or 'No'."
        });
    }

    public async exec(msg: Message) {
        const client = this.client as RippleClient;
        const _enum = Math.floor(Math.random() * 2);
        return msg.reply(
            client.Embed()
                .setTitle("✅ Yes Or No ❌")
                .setDescription(`Your answer: ${_enum === 1 ? "Yes" : "No"}.`)
        );
    }
}