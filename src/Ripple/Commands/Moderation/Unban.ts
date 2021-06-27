import { Argument, Command } from "discord-akairo";
import { Guild, GuildMember, Message, User } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "unban";
        super(name, {
            aliases: [name, "unbanish"],
            userPermissions: "BAN_MEMBERS",
            clientPermissions: "BAN_MEMBERS",
            cooldown: 5e3,
            description: {
                content: "Unbans a member from the server.",
                usage: "<@member> <reason?>"
            },
            args: [
                Arg("member", "user"),
                Arg("reason", "string")
            ],
        });
    }

    public async exec(msg: Message, { member, reason }: { member: User, reason?: string }) {
        if (!member)
            return this.client.Logger.MissingArgError(msg, "member");

        const bans = await msg.guild.fetchBans();
        const ban = await bans.find(ban => ban.user === member);
        if (!ban)
            return this.client.Logger.InvalidArgError(msg, "User is not banned from this server or never joined.");

        return msg.guild.members.unban(ban.user, reason)
            .then(unbannedUser => msg.reply(
                this.client.Success(`\`@${unbannedUser.tag}\` was successfully unbanned.`)
                    .addField("Reason", reason?? "n/a")
            )).catch(err => this.client.Logger.DiscordAPIError(msg, err));
    }
}