import { Command } from "discord-akairo";
import { GuildMember, Message, MessageEmbed } from "discord.js";
import { Arg } from "../../Util";
import { Infraction } from "../../Components/DataManagement/Managers/InfractionManager";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "removeinfraction";
        super(name, {
            aliases: [name, "removewarning"],
            userPermissions: "MANAGE_MESSAGES",
            cooldown: 3e3,
            description: {
                content: "Returns a list of a member's infractions.",
                usage: "<@member> <warningNumber>"
            },
            args: [ 
                Arg("member", "member"),
                Arg("warningNumber", "number")
            ]
        });
    }

    public async exec(msg: Message, { member, warningNumber }: { member: GuildMember, warningNumber: number }) {
        if (!member)
            return this.client.Logger.MissingArgError(msg, "member");

        if (!warningNumber)
            return this.client.Logger.MissingArgError(msg, "warningNumber");

        if (member.user.bot)
            return this.client.Logger.InvalidArgError(msg, "Bots do not receive infractions.");

        const infraction = await this.client.Infractions.Find(member, warningNumber - 1);
        if (!infraction)
            return this.client.Logger.InvalidArgError(msg, `Could not find infraction with index \`${warningNumber}\`.`);

        return this.client.Infractions.Remove(member, infraction)
            .then(() => msg.reply(
                this.client.Success(`Successfully removed infraction issued by \`@${infraction.Issuer.displayName}.\``)
            ));
    }
}