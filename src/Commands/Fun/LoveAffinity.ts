import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "loveaffinity";
        super(name, {
            aliases: [name, "love", "affinity"],
            description: {
                content: "Returns the love affinity between you and another user, or a random user.",
                usage: "<@user?>"
            },
            args: [
                {
                    id: "member",
                    type: "member"
                }
            ]
        });
    }

    public async exec(msg: Message, { member = msg.guild.members.cache.random() }: { member: GuildMember }) {
        const client = this.client as RippleClient;
        const affinity = Math.round(Math.random() * 100);

        return msg.reply(
            client.Embed()
                .setTitle("💖 Love Affinity 💖")
                .setDescription(`${msg.member} is a ${affinity}% match for ${member}`)
                .setColor("#FF00E1")
        );
    }
}