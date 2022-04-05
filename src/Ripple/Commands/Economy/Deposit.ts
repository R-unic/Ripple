import { Command } from "discord-akairo";
import { Message, GuildMember } from "discord.js";
import { Arg, CommaNumber } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "deposit";
        super(name, {
            aliases: [name, "dep"],
            ratelimit: 2,
            description: {
                content: "Transfers specified amount of funds into bank account from wallet.",
                usage: '<amount>'
            },
            args: [
                Arg("amount", "integer")
            ]
        });
    }

    public async exec(msg: Message, { amount }: { amount: number }) {
        if (!amount) 
            return this.client.Logger.MissingArgError(msg, "amount");
        if (amount > await this.client.Cash.Get(msg.member))
            return this.client.Logger.InvalidArgError(msg, "The cash amount specified exceeds your wallet's balance.");

        return this.client.Cash.Decrement(msg.member, amount)
            .then(() => 
                this.client.Bank.Increment(msg.member, amount)
                    .then(async success => {
                        if (success)
                            msg.reply(
                                this.client.Success(`Successfully deposited $${CommaNumber(amount)} into your bank account.`)
                            );
                    })
            );
    }
}