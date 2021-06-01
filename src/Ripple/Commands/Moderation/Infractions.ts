import { Command } from "discord-akairo";
import { GuildMember, Message, MessageEmbed } from "discord.js";
import { Arg } from "../../Util";
import { Infraction } from "../../Components/DataManagement/Managers/InfractionManager";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "infractions";
        super(name, {
            aliases: [name, "warnings"],
            cooldown: 3e3,
            description: {
                content: "Returns a list of a member's infractions.",
                usage: "<@member?>"
            },
            args: [ Arg("member", "member", msg => msg.member) ]
        });
    }

    public async exec(msg: Message, { member }: { member: GuildMember }) {
        if (!member)
            return this.client.Logger.MissingArgError(msg, "member");

        if (member.user.bot)
            return this.client.Logger.InvalidArgError(msg, "Bots do not receive infractions.");

        const infractions: Infraction[] = await this.client.Infractions.Get(member);
        const embed: MessageEmbed = this.client.Embed(`${member.displayName}'s Infractions`)
            .setThumbnail(member.user.avatarURL({ dynamic: true }));

        if (!infractions || infractions.length === 0)
            embed.setDescription(`${member.displayName} has no infractions.`);
        else
            for (const infraction of infractions)
                embed.addField(
                    `Issued by \`@${infraction?.Issuer.displayName}\``, 
                    `For: ${infraction.Reason}`,
                    true
                );
                
        return msg.reply(embed);
    }
}