import { Argument, Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "ban";
        super(name, {
            aliases: [name, "permbanish", "permban", "banish"],
            userPermissions: "BAN_MEMBERS",
            clientPermissions: "BAN_MEMBERS",
            cooldown: 5e3,
            description: {
                content: "Banishes a member from the server permanently.",
                usage: "<@member> <reason?>"
            },
            args: [
                Arg("member", "member"),
                Arg("reason", "string")
            ],
        });
    }

    public async exec(msg: Message, { member, reason }: { member: GuildMember, reason?: string }) {
        if (!member)
            return this.client.Logger.MissingArgError(msg, "member");

        if (member === msg.member)
            return this.client.Logger.InvalidArgError(msg, "You cannot ban yourself.");

        if (member === msg.guild.owner)
            return this.client.Logger.InvalidArgError(msg, "You cannot ban the server owner.");

        return member.ban({
            reason: reason
        }).then(bannedMember => msg.reply(
            this.client.Success(`${bannedMember} was successfully banned.`)
                .addField("Reason", reason?? "n/a")
        )).catch(err => this.client.Logger.DiscordAPIError(msg, err));
    }
}