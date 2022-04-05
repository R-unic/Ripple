import { Command } from "discord-akairo";
import { Message, GuildMember } from "discord.js";
import { Arg, CommaNumber } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "addmoney";
        super(name, {
            aliases: [name, "addcash"],
            cooldown: 6e3,
            ratelimit: 2,
            userPermissions: "ADMINISTRATOR",
            description: {
                content: "Adds a specified amount of money to a member's balance.",
                usage: '<destination: "bank" | "wallet"> <amount> <@member?>'
            },
            args: [
                Arg("destination", "string"),
                Arg("amount", "integer"),
                Arg("member", "member", m => m.member)
            ]
        });
    }

    public async exec(msg: Message, { destination, member, amount }: { destination: string, member: GuildMember, amount: number }) {
        if (!member) 
            return this.client.Logger.MissingArgError(msg, "member");
        if (member.user.bot)
            return this.client.Logger.InvalidArgError(msg, "Bots do not have balances.");
        if (!destination) 
            return this.client.Logger.MissingArgError(msg, "destination");
        if (!amount) 
            return this.client.Logger.MissingArgError(msg, "amount");
        
        if (this.client.VerifySource(destination))
            return this.client.Logger.InvalidArgError(msg, "Destination of funds must be 'bank' or 'wallet'. Got '" + destination + "'.");

        destination = destination.toLowerCase()
        const store = destination === "bank" ? this.client.Bank : this.client.Cash;
        return store.Increment(member, Math.abs(amount))
            .then(async success => {
                if (success)
                    msg.reply(
                        this.client.Success(`Successfully added $${CommaNumber(amount)} to ${member}'s ${destination}. ${member} now has $${CommaNumber(await store.Get(member))}`)
                    );
            })
    }
}