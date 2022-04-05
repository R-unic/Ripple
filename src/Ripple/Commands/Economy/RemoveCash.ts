import { Command } from "discord-akairo";
import { Message, GuildMember } from "discord.js";
import { Arg, CommaNumber } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "removemoney";
        super(name, {
            aliases: [name, "removecash", "remcash", "remmoney"],
            cooldown: 6e3,
            ratelimit: 2,
            userPermissions: "ADMINISTRATOR",
            description: {
                content: "Removes a specified amount of money from a member's balance.",
                usage: '<destination: "bank" | "wallet"> <amount> <@member?>'
            },
            args: [
                Arg("source", "string"),
                Arg("amount", "integer"),
                Arg("member", "member", m => m.member)
            ]
        });
    }

    public async exec(msg: Message, { source, member, amount }: { source: string, member: GuildMember, amount: number }) {
        if (!member) 
            return this.client.Logger.MissingArgError(msg, "member");
        if (member.user.bot)
            return this.client.Logger.InvalidArgError(msg, "Bots do not have balances.");
        if (!source) 
            return this.client.Logger.MissingArgError(msg, "source");
        if (!amount) 
            return this.client.Logger.MissingArgError(msg, "amount");
        
        if (this.client.VerifySource(source))
            return this.client.Logger.InvalidArgError(msg, "Destination of funds must be 'bank' or 'wallet'. Got '" + source + "'.");

        source = source.toLowerCase()
        const store = source === "bank" ? this.client.Bank : this.client.Cash;
        return store.Decrement(member, Math.abs(amount))
            .then(async success => {
                if (success)
                    msg.reply(
                        this.client.Success(`Successfully removed $${CommaNumber(amount)} from ${member}'s ${source}. ${member} now has $${CommaNumber(await store.Get(member))}`)
                    );
            })
    }
}