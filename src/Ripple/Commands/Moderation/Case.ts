import { Command } from "discord-akairo";
import { GuildMember, Message, MessageEmbed } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "case";
        super(name, {
            aliases: [name, "infraction", "warning"],
            cooldown: 3e3,
            description: {
                content: "Returns a speific case of a member's infractions.",
                usage: "<case> <@member?>"
            },
            args: [ 
                Arg("caseNumber", "number"),
                Arg("member", "member", msg => msg.member)
            ]
        });
    }

    public async exec(msg: Message, { caseNumber, member }: { caseNumber: number, member: GuildMember }) {
        if (!caseNumber)
            return this.client.Logger.MissingArgError(msg, "case");
            
        if (!member)
            return this.client.Logger.MissingArgError(msg, "member");

        if (member.user.bot)
            return this.client.Logger.InvalidArgError(msg, "Bots do not receive infractions.");

        const infraction = await this.client.Infractions.Find(member, caseNumber);
        if (!infraction)
            return this.client.Logger.InvalidArgError(msg, `An infraction with the index \`${caseNumber}\` does not exist.`);
        
        return msg.reply(
            this.client.Embed(`Infraction \`#${caseNumber}\` for \`@${member.user.tag}\``)  
                .addField("Issuer", `@${infraction.Issuer.user.tag}`)
                .addField("Reason", infraction.Reason)
        );
    }
}