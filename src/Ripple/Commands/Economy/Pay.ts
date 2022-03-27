import { Command } from "discord-akairo";
import { Message, GuildMember } from "discord.js";
import { Arg, CommaNumber } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "pay";
        super(name, {
            aliases: [name, "givecash", "givemoney"],
            cooldown: 6e3,
            ratelimit: 2,
            description: {
                content: "Pays a specified amount of cash to a member.",
                usage: "<@member> <amount>"
            },
            args: [
                Arg("member", "member"),
                Arg("amount", "number")
            ]
        });
    }

    public async exec(msg: Message, { member, amount }: { member: GuildMember, amount: number }) {
        if (!member) 
            return this.client.Logger.MissingArgError(msg, "member");
        if (!amount) 
            return this.client.Logger.MissingArgError(msg, "amount");
        if (member === msg.member)
            return this.client.Logger.InvalidArgError(msg, "You cannot pay yourself.");
        if (amount > await this.client.Cash.Get(msg.member))
            return this.client.Logger.InvalidArgError(msg, "The cash amount specified exceeds your balance.");

        return this.client.Cash.Increment(member, Math.abs(amount))
            .then(() => 
                this.client.Cash.Increment(msg.member, -Math.abs(amount))
                    .then(async success => {
                        if (success)
                            msg.reply(
                                this.client.Success(`Successfully paid $${CommaNumber(amount)} to ${member}.`)
                            );
                    })
            );
    }
}