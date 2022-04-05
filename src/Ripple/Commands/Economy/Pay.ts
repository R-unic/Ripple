import { Command } from "discord-akairo";
import { Message, GuildMember } from "discord.js";
import { Arg, CommaNumber } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "pay";
        super(name, {
            aliases: [name, "givecash", "givemoney"],
            cooldown: 4e3,
            ratelimit: 2,
            description: {
                content: "Pays a specified amount of cash to a member.",
                usage: '<source: "bank" | "wallet"> <@member> <amount>'
            },
            args: [
                Arg("source", "string"),
                Arg("member", "member"),
                Arg("amount", "integer")
            ]
        });
    }

    public async exec(msg: Message, { source, member, amount }: { source: string, member: GuildMember, amount: number }) {
        if (!member) 
            return this.client.Logger.MissingArgError(msg, "member");
        if (!amount) 
            return this.client.Logger.MissingArgError(msg, "amount");
        if (member === msg.member)
            return this.client.Logger.InvalidArgError(msg, "You cannot pay yourself.");

        if (this.client.VerifySource(source))
            return this.client.Logger.InvalidArgError(msg, "Source of funds must be 'bank' or 'wallet'. Got '" + source + "'.");
        if (amount > await this.client.Cash.TotalMoney(msg.member))
            return this.client.Logger.InvalidArgError(msg, "The cash amount specified exceeds your balance.");

        source = source.toLowerCase();        
        return this.client.Cash.Increment(member, amount)
            .then(() => 
                (source === "bank" ? this.client.Bank : this.client.Cash).Decrement(msg.member, amount)
                    .then(async success => {
                        if (success)
                            msg.reply(
                                this.client.Success(`Successfully paid $${CommaNumber(amount)} to ${member} from your ${source}'s balance.`)
                            );
                    })
            );
    }
}