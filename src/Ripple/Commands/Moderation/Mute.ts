import { Command } from "discord-akairo";
import { GuildMember, Message, Role } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";
import ms from "ms";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "mute";
        super(name, {
            aliases: [name, "silence", "stfu", "sthu", "shutup", "quiet"],
            userPermissions: "MANAGE_MESSAGES",
            clientPermissions: "MANAGE_ROLES",
            cooldown: 5e3,
            description: {
                content: "Mutes a member in the server.",
                usage: "<@member> <timePeriod?>"
            },
            args: [
                Arg("member", "member"),
                Arg("timePeriod", "string")
            ],
        });
    }

    public async exec(msg: Message, { member, timePeriod }: { member: GuildMember, timePeriod?: string }) {
        if (!member)
            return this.client.Logger.MissingArgError(msg, "member");

        const muted: Role = msg.guild.roles.cache.find(r => r.name.includes("Mute")) || await msg.guild.roles.create({
            data: {
                name: "Muted",
                color: "DARK_BUT_NOT_BLACK",
                permissions: [
                    "VIEW_CHANNEL",
                    "CONNECT",
                    "READ_MESSAGE_HISTORY"                
                ]
            }, reason: "Mute command"
        });

        const timeMS = timePeriod? 
            ms(timePeriod) 
            :undefined;
        
        if (timeMS)
            setTimeout(() => 
                member.roles.remove(muted, "Unmuted")
                    .then(member => msg.reply(
                        this.client.Success(`${member} was successfully unmuted.`)
                    )), 
            timeMS);

        return member.roles.add(muted, "Muted")
            .then(mutedMember => msg.reply(
                this.client.Success(`${mutedMember} was successfully muted ${timeMS ? `for \`${timePeriod}\`` : "until they are unmuted"}.`)
            )).catch(err => this.client.Logger.DiscordAPIError(msg, err));
    }
}