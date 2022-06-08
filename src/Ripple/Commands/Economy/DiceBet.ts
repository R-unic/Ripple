import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg, CommaNumber } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "dicebet";
        super(name, {
            aliases: [name, "diebet", "betdice", "dicegamble"],
            description: {
                content: "Rolls a dice and if you win you get a reward.",
                usage: "<betNumber> <betAmount>"
            },
            args: [
                Arg("betNumber", "integer"),
                Arg("betAmount", "integer")
            ]
        });
    }

    public async exec(msg: Message, { betNumber, betAmount }: { betNumber: number, betAmount: number }) {
        if (!await this.client.Economy.Get(msg.member))
            return this.client.Logger.CouldNotBeExecutedError(msg, "This guild has economy disabled.");
            
        if (!betNumber) 
            return this.client.Logger.MissingArgError(msg, "betNumber");
        if (betNumber < 1 || betNumber > 6)
            return this.client.Logger.InvalidArgError(msg, "Can only bet on numbers 1-6. Got '" + betNumber + "'.");
        if (!betAmount) 
            return this.client.Logger.MissingArgError(msg, "betAmount");
        if (await this.client.Bank.TotalMoney(msg.member) < Math.abs(betAmount))
            return this.client.Logger.InvalidArgError(msg, "You do not have enough cash to place this bet.");

        const roll = Math.ceil(Math.random() * 6);
        if (roll === betNumber)
            await this.client.Bank.Increment(msg.member, betAmount);
        else
            await this.client.Cash.Decrement(msg.member, betAmount);

        return msg.reply(
            this.client.Embed(`You ${roll === betNumber ? "won" : "lost"} the bet!`)
                .setDescription(`🎲: ${roll}\n\nAmount Bet: $${CommaNumber(betAmount)}`)
        );
    }
}