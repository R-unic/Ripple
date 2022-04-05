import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { CommaNumber, RandomInt } from "../../Util";
import { TimeQueue } from "../../Components/DataInterfaces/TimeQueue";
import Ripple from "../../Client";
import ms from "ms";

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
        const queue = await this.client.TimeQueue.Find(msg.member, "work");
        if (queue && this.client.TimeQueue.Elapsed(queue) < queue.Length)
            return this.client.Logger.CouldNotBeExecutedError(msg, "This command can only be used once every hour.");

        const amount = RandomInt(400);
        return this.client.Bank.Increment(msg.member, amount)
            .then(s => {
                if (s) {
                    this.client.TimeQueue.Add(msg.member, new TimeQueue("work", ms("1h")));
                    return msg.reply(
                        this.client.Embed("Work", "💼")
                            .setDescription("You worked for a total of $" + CommaNumber(amount) + ".")
                    );
                }
            });
    }
}