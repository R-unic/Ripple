import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "clearinfractions";
        super(name, {
            aliases: [name, "removeinfractions", "removewarnings", "clearwarnings", "clearwarn"],
            userPermissions: "MANAGE_MESSAGES",
            cooldown: 3e3,
            description: {
                content: "Clears all of a member's infractions.",
                usage: "<@member>"
            },
            args: [ Arg("member", "member") ]
        });
    }

    public async exec(msg: Message, { member }: { member: GuildMember }) {
        if (!member)
            return this.client.Logger.MissingArgError(msg, "member");

        if (member.user.bot)
            return this.client.Logger.InvalidArgError(msg, "Bots do not receive infractions.");

        return this.client.Infractions.Clear(member)
            .then(amount => msg.reply(
                this.client.Success(
                    amount !== 0?
                    `Successfully cleared \`${amount}\` infractions from ${member}.`
                    :`${member} has no infractions, removed nothing.`
                )
            ));
    }
}