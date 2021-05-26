import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "avatar";
        super(name, {
            aliases: [name, "pfp", "profilepic", "useravatar"],
            description: {
                content: "Returns a user's avatar or your own.",
                usage: "<@user?>"
            },
            args: [
                {
                    id: "member",
                    type: "member",
                    default: null
                }
            ]
        });
    }

    public async exec(msg: Message, { member = msg.member }: { member: (GuildMember | null) }) {
        const client = this.client as RippleClient;

        return msg.reply(
            client.Embed()
                .setTitle(`${member.displayName}'s Avatar`)
                .setImage(member.user.displayAvatarURL({ dynamic: true }))
        );
    }
}