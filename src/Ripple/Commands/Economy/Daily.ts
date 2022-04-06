import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { TimeQueue } from "../../Components/DataInterfaces/TimeQueue";
import Ripple from "../../Client";
import ms from "ms";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "daily";
        super(name, {
            aliases: [name, "dailies", "claimdaily"],
            ratelimit: 2,
            description: "Claim your daily cash."
        });
    }

    public async exec(msg: Message) {
        if (!await this.client.Economy.Get(msg.member))
            return this.client.Logger.CouldNotBeExecutedError(msg, "This guild has economy disabled.");
            
        const qTag = "daily";
        const queue = await this.client.TimeQueue.Find(msg.member, qTag);
        if (typeof queue !== "undefined" && this.client.TimeQueue.Elapsed(msg.member, queue) < queue.Length)
            return this.client.Logger.CouldNotBeExecutedError(msg, "Daily rewards can only be claimed once every 24 hours.");

        const amount = 750;
        return this.client.Bank.Increment(msg.member, amount)
            .then(s => {
                if (s) {
                    this.client.TimeQueue.Add(msg.member, new TimeQueue(qTag, ms("1d")));
                    return msg.reply(
                        this.client.Success("Successfully claimed daily reward for $" + amount)
                    );
                }
            });
    }
}