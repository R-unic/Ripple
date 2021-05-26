import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Ripple/Util";
import RippleClient from "../../Ripple/Client";

export default class extends Command<RippleClient> {
    public constructor() {
        const name = "avatar";
        super(name, {
            aliases: [name, "pfp", "profilepic", "useravatar"],
            description: {
                content: "Returns a user's avatar or your own.",
                usage: "<@user?>"
            },
            args: [ Arg("member", "member") ]
        });
    }

    public async exec(msg: Message, { member = msg.member }: { member?: GuildMember }) {
        return msg.reply(
            this.client.Embed()
                .setTitle(`${member.displayName}'s Avatar`)
                .setImage(member.user.displayAvatarURL({ dynamic: true }))
        );
    }
}