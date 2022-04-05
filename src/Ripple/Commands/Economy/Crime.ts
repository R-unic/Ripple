import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { CommaNumber, RandomInt } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "crime";
        super(name, {
            aliases: [name, "commitcrime", "crimepay"],
            ratelimit: 2,
            description: "Earn a random amount of money for committing crimes."
        });
    }

    public async exec(msg: Message) {
        const amount = RandomInt(550);
        return this.client.Bank.Increment(msg.member, amount)
            .then(s => {
                if (s)
                    msg.reply(
                        this.client.Embed("Crime", "🚨")
                            .setDescription("You committed crimes for a total of $" + CommaNumber(amount) + ".")
                    );
            });
    }
}