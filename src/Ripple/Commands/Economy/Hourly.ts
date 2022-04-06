import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { TimeQueue } from "../../Components/DataInterfaces/TimeQueue";
import Ripple from "../../Client";
import ms from "ms";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "hourly";
        super(name, {
            aliases: [name, "hourlies", "claimhourly"],
            ratelimit: 2,
            description: "Claim your hourly cash."
        });
    }

    public async exec(msg: Message) {
        if (!await this.client.Economy.Get(msg.member))
            return this.client.Logger.CouldNotBeExecutedError(msg, "This guild has economy disabled.");
            
        const qTag = "hourly";
        const queue = await this.client.TimeQueue.Find(msg.member, qTag);
        if (queue && this.client.TimeQueue.Elapsed(msg.member, queue) < queue.Length)
            return this.client.Logger.CouldNotBeExecutedError(msg, "Hourly rewards can only be claimed once every hour.");

        const amount = 400;
        return this.client.Bank.Increment(msg.member, amount)
            .then(s => {
                if (s) {
                    this.client.TimeQueue.Add(msg.member, new TimeQueue(qTag, ms("1h")));
                    return msg.reply(
                        this.client.Success("Successfully claimed hourly reward for $" + amount)
                    );
                }
            });
    }
}