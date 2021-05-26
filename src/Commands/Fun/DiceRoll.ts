import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "diceroll";
        super(name, {
            aliases: [name, "rolldice", "rolldie", "dice"],
            description: "Returns a random number 1-6."
        });
    }

    public async exec(msg: Message) {
        const client = this.client as RippleClient;
        const diceNumber = Math.round(Math.random() * 6);
        return msg.reply(
            client.Embed()
                .setTitle("🎲 Dice Roll 🎲")
                .setDescription(`I rolled a dice for you, ${msg.member}. It landed on ${diceNumber}!`)
        );
    }
}