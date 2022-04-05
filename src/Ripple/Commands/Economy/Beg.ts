import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { CommaNumber, RandomInt } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "beg";
        super(name, {
            aliases: [name, "panhandle"],
            ratelimit: 2,
            description: "Earn a random amount of money by begging."
        });
    }

    public async exec(msg: Message) {
        const amount = RandomInt(300);
        return this.client.Bank.Increment(msg.member, amount)
            .then(s => {
                if (s)
                    msg.reply(
                        this.client.Embed("Panhandling", "💰")
                            .setDescription("You begged for a total of $" + CommaNumber(amount) + ".")
                    );
            });
    }
}