import { Command } from "discord-akairo";
import { GuildMember, Message, Role } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "unmute";
        super(name, {
            aliases: [name, "unsilence"],
            userPermissions: "MANAGE_MESSAGES",
            clientPermissions: "MANAGE_ROLES",
            cooldown: 5e3,
            description: {
                content: "Unmutes a member in the server.",
                usage: "<@member>"
            },
            args: [  Arg("member", "member") ]
        });
    }

    public async exec(msg: Message, { member }: { member: GuildMember }) {
        if (!member)
            return this.client.Logger.MissingArgError(msg, "member");

        const muted: Role = msg.guild.roles.cache.find(r => r.name.includes("Mute"));
        if (!muted)
            return this.client.Logger.CouldNotBeExecutedError(msg, "'Muted' role does not exist, use `::mute <@user> <timePeriod?>` to create it automatically.")

        return member.roles.remove(muted, "Unmuted")
            .then(unmutedMember => msg.reply(
                this.client.Success(`${unmutedMember} was successfully unmuted.`)
            )).catch(err => this.client.Logger.DiscordAPIError(msg, err));
    }
}