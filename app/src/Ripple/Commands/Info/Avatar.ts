import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "avatar";
        super(name, {
            aliases: [name, "pfp", "profilepic", "useravatar", "av"],
            description: {
                content: "Returns a user's avatar or your own.",
                usage: "<@user?>"
            },
            args: [ Arg("member", "member", msg => msg.member) ]
        });
    }

    public async exec(msg: Message, { member  }: { member: GuildMember }) {
        return msg.reply(
            this.client.Embed()
                .setTitle(`\`${member.user.tag}\`'s Avatar`)
                .setImage(member.user.displayAvatarURL({ dynamic: true }))
        );
    }
}