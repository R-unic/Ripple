import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { CommaNumber, RandomInt } from "../../Util";
import { TimeQueue } from "../../Components/DataInterfaces/TimeQueue";
import Ripple from "../../Client";
import ms from "ms";

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
        const queue = await this.client.TimeQueue.Find(msg.member, "crime");
        if (queue && this.client.TimeQueue.Elapsed(msg.member, queue) < queue.Length)
            return this.client.Logger.CouldNotBeExecutedError(msg, "This command can only be used once every hour.");

        const amount = RandomInt(550);
        return this.client.Bank.Increment(msg.member, amount)
            .then(s => {
                if (s) {
                    this.client.TimeQueue.Add(msg.member, new TimeQueue("crime", ms("1h")));
                    return msg.reply(
                        this.client.Embed("Crime", "🚨")
                            .setDescription("You committed crimes for a total of $" + CommaNumber(amount) + ".")
                    );
                }
            });
    }
}