import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "diceroll";
        super(name, {
            aliases: [name, "rolldice", "rolldie", "dice"],
            description: "Returns a random number 1-6."
        });
    }

    public async exec(msg: Message) {
        const diceNumber = Math.round(Math.random() * 6);
        return msg.reply(
            this.client.Embed("🎲 Dice Roll 🎲")
                .setDescription(`I rolled a dice for you, ${msg.member}. It landed on ${diceNumber}!`)
        );
    }
}