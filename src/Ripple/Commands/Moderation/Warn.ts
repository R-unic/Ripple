import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Util";
import { Infraction } from "../../Components/DataManagement/Managers/InfractionManager";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "warn";
        super(name, {
            aliases: [name, "addinfraction", "addwarning", "infraction"],
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
            return this.client.Logger.InvalidArgError(msg, "Cannot warn a bot.");

        return this.client.Infractions.Add(member, new Infraction(
            msg.member,
            member,
            reason?? "No reason provided.",
            msg.createdAt
        )).then(async () => {
            const infractions = await this.client.Infractions.Get(member);
            const infractionAmount = infractions.length;
            const lastWarning = infractionAmount === 4;

            if (lastWarning)
                await member.kick(reason);

            return msg.reply(
                this.client.Success(
                    lastWarning?
                    `Successfully kicked \`${member.user.tag}\`. This was their last infraction.`
                    :`Successfully warned \`${member.user.tag}\`. This is infraction number \`${infractionAmount}\`.`
                )
            ).then(() => lastWarning? 
                this.client.Infractions.Set(member, undefined)
                :void 0
            );
        });
    }
}