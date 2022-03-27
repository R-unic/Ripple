import { Command } from "discord-akairo";
import { Message, GuildMember } from "discord.js";
import { Arg, CommaNumber } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "removecash";
        super(name, {
            aliases: [name, "removemoney", "subtractcash", "subtractmoney", "subcash", "submoney", "remcash", "remmoney"],
            cooldown: 6e3,
            ratelimit: 2,
            userPermissions: "ADMINISTRATOR",
            description: {
                content: "Removes a specified amount of cash from a member's balance.",
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

        return this.client.Cash.Increment(member, -Math.abs(amount))
            .then(async success => {
                if (success)
                    msg.reply(
                        this.client.Success(`Successfully removed $${CommaNumber(amount)} from ${member}'s balance. ${member} now has ${CommaNumber(await this.client.Cash.Get(member))}`)
                    );
            })
    }
}