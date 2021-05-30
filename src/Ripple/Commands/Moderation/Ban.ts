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
            cooldown: 5,
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

        return member.ban({
            reason: reason
        }).then(bannedMember => msg.reply(
            this.client.Success()
                .setDescription(`${bannedMember.user.tag} was successfully banned.`)
                .addField("Reason", reason ?? "n/a")
        ));;
    }
}