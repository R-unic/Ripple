import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "coinflip";
        super(name, {
            aliases: [name, "flipcoin", "headsortails"],
            description: "Returns either 'Heads' or 'Tails'."
        });
    }

    public async exec(msg: Message) {
        const num = Math.floor(Math.random() * 2);
        return msg.reply(
            this.client.Embed("🪙 Coinflip 🪙")
                .setDescription(`I flipped a coin for you, ${msg.member}. It was ${num === 1 ? "Heads" : "Tails"}!`)
        );
    }
}