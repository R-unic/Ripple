import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { CommaNumber, RandomInt } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "work";
        super(name, {
            aliases: [name, "job", "workjob"],
            ratelimit: 2,
            description: "Earn a random amount of money for working."
        });
    }

    public async exec(msg: Message) {
        const amount = RandomInt(400);
        return this.client.Bank.Increment(msg.member, amount)
            .then(s => {
                if (s)
                    msg.reply(
                        this.client.Embed("Work", "💼")
                            .setDescription("You worked for a total of $" + CommaNumber(amount) + ".")
                    );
            });
    }
}