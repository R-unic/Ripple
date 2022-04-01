import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg, StripISO } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "userinfo";
        super(name, {
            aliases: [name, "memberinfo", "whois", "identify"],
            description: {
                content: "Returns information about the user provided, or yourself.",
                usage: "<@member?>"
            },
            args: [ Arg("member", "member", msg => msg.member) ]
        });
    }

    public async exec(msg: Message, { member }: { member: GuildMember }) {
        return msg.reply(
            this.client.Embed()
                .setTitle(member.user.username + "#" + member.user.discriminator)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .addField("Joined Discord On", StripISO(member.user.createdAt), true)
                .addField("Joined Server On", StripISO(member.joinedAt), true)
                .addField("Nitro Since", member.premiumSince ? StripISO(member.premiumSince) : "Never", true)
                .addField("Roles", member.roles.cache.array(), true)
                .addField("Manageable", member.manageable ? "Yes" : "No", true)
                .addField("Ripple Premium", this.client.Premium.Has(member.user) ? "Yes" : "No", true)
                .setColor(msg.member.displayHexColor)
        );
    }
}