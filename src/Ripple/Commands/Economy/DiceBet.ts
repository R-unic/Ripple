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
                Arg("betNumber", "number"),
                Arg("betAmount", "number")
            ]
        });
    }

    public async exec(msg: Message, { betNumber, betAmount }: { betNumber: number, betAmount: number }) {
        if (!betNumber) 
            return this.client.Logger.MissingArgError(msg, "betNumber");
        if (!betAmount) 
            return this.client.Logger.MissingArgError(msg, "betAmount");
        if (await this.client.Cash.Get(msg.member) < Math.abs(betAmount))
            return this.client.Logger.InvalidArgError(msg, "You do not have enough cash to place this bet.")

        const roll = Math.ceil(Math.random() * 6);
        if (roll === betNumber)
            await this.client.Cash.Increment(msg.member,  Math.abs(betAmount))
        else
            await this.client.Cash.Increment(msg.member, -Math.abs(betAmount));

        const newBal: number = await this.client.Cash.Get(msg.member);
        return msg.reply(
            this.client.Embed(`You ${roll === betNumber ? "won" : "lost"} the bet!`)
                .setDescription(`🎲: ${roll}\nAmount Bet: $${CommaNumber(betAmount)}\nNew Balance: $${CommaNumber(newBal)}`)
        )
    }
}