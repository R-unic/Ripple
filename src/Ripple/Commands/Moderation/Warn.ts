import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Util";
import { Infraction } from "../../Components/DataManagement/Managers/GuildMember/InfractionManager";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "warn";
        super(name, {
            aliases: [name, "addinfraction", "addwarning", "newinfraction", "newwarning"],
            userPermissions: "MANAGE_MESSAGES",
            cooldown: 5e3,
            description: {
                content: "Warns a member, adding an infraction.",
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

        if (member.user.bot)
            return this.client.Logger.InvalidArgError(msg, "You cannot warn a bot.");

        if (member === msg.member)
            return this.client.Logger.InvalidArgError(msg, "You cannot warn yourself.");

        if (member === msg.guild.owner)
            return this.client.Logger.InvalidArgError(msg, "You cannot warn the server owner.");

        return this.client.Infractions.Add(member, new Infraction(
            msg.member,
            member,
            reason?? "No reason provided."
        )).then(async () => {
            const infractions = await this.client.Infractions.Get(member);
            const infractionAmount = infractions.length;
            const kickWarning = infractionAmount === 4;
            const banWarning = infractionAmount === 8;

            if (kickWarning)
                await member.kick(reason)
                    .catch(err => this.client.Logger.DiscordAPIError(msg, err));

            if (kickWarning)
                await member.ban({ reason: reason })
                    .then(() => this.client.Infractions.Clear(member))
                    .catch(err => this.client.Logger.DiscordAPIError(msg, err));

            return msg.reply(
                this.client.Success(
                    kickWarning?
                    `Successfully kicked \`${member.user.tag}\`. This was their \`4th\` infraction.`
                    :(
                        banWarning?
                        `Successfully banned \`${member.user.tag}\`. This was their \`8th\` infraction.`
                        :`Successfully warned \`${member.user.tag}\`. This is infraction number \`${infractionAmount}\`.`
                    )
                )
            ).catch(err => this.client.Logger.UtilError(msg, err));
        });
    }
}