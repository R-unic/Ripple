import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { CommaNumber, RandomInt } from "../../Util";
import { TimeQueue } from "../../Components/DataInterfaces/TimeQueue";
import Ripple from "../../Client";
import ms from "ms";

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
        if (!await this.client.Economy.Get(msg.member))
            return this.client.Logger.CouldNotBeExecutedError(msg, "This guild has economy disabled.");
            
        const queue = await this.client.TimeQueue.Find(msg.member, "beg");
        if (queue && this.client.TimeQueue.Elapsed(msg.member, queue) < queue.Length)
            return this.client.Logger.CouldNotBeExecutedError(msg, "This command can only be used once every hour.");

        const amount = RandomInt(300);
        return this.client.Bank.Increment(msg.member, amount)
            .then(s => {
                if (s) {
                    this.client.TimeQueue.Add(msg.member, new TimeQueue("beg", ms("1h")));
                    return msg.reply(
                        this.client.Embed("Panhandling", "💰")
                            .setDescription("You begged for a total of $" + CommaNumber(amount) + ".")
                    );
                }
            });
    }
}