import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "coinflip";
        super(name, {
            aliases: [name, "flipcoin", "headsortails"],
            description: "Returns either 'Heads' or 'Tails'."
        });
    }

    public async exec(msg: Message) {
        const client = this.client as RippleClient;
        const _enum = Math.floor(Math.random() * 2);
        return msg.reply(
            client.Embed()
                .setTitle("🪙 Coinflip 🪙")
                .setDescription(`I flipped a coin for you, ${msg.member}. It was ${_enum === 1 ? "Heads" : "Tails"}!`)
        );
    }
}