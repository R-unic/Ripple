import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "kick";
        super(name, {
            aliases: [name, "purgemember", "purgeuser"],
            userPermissions: "KICK_MEMBERS",
            clientPermissions: "KICK_MEMBERS",
            cooldown: 5e3,
            description: {
                content: "Kicks a member from the server.",
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

        return member.kick(reason)
            .then(kickedMember => msg.reply(
                this.client.Success(`${kickedMember} was successfully kicked.`)
                    .addField("Reason", reason?? "n/a")
            )).catch(err => this.client.Logger.DiscordAPIError(msg, err));
    }
}