import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg, CommaNumber } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "withdraw";
        super(name, {
            aliases: [name, "wd"],
            ratelimit: 2,
            description: {
                content: "Transfers specified amount of funds into wallet from bank account.",
                usage: '<amount>'
            },
            args: [ Arg("amount", "integer") ]
        });
    }

    public async exec(msg: Message, { amount }: { amount: number }) {
        if (!await this.client.Economy.Get(msg.member))
            return this.client.Logger.CouldNotBeExecutedError(msg, "This guild has economy disabled.");

        if (!amount) 
            return this.client.Logger.MissingArgError(msg, "amount");
        if (amount > await this.client.Bank.Get(msg.member))
            return this.client.Logger.InvalidArgError(msg, "The amount specified exceeds your bank account's balance.");

        return this.client.Bank.Decrement(msg.member, amount)
            .then(() => 
                this.client.Cash.Increment(msg.member, amount)
                    .then(async success => {
                        if (success)
                            msg.reply(
                                this.client.Success(`Successfully withdrew $${CommaNumber(amount)} from your bank account.`)
                            );
                    })
            );
    }
}