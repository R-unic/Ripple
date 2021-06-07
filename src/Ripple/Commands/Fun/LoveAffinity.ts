import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg, RandomUser } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "loveaffinity";
        super(name, {
            aliases: [name, "love", "affinity"],
            description: {
                content: "Returns the love affinity between you and another user, or a random user.",
                usage: "<@user?>"
            },
            args: [ Arg("member", "member", RandomUser) ]
        });
    }

    public async exec(msg: Message, { member }: { member: GuildMember }) {
        const affinity = Math.round(Math.random() * 100);

        return msg.reply(
            this.client.Embed("Love Affinity", "💖")
                .setDescription(`${msg.member} is a ${affinity}% match for ${member}`)
                .setColor("#FF00E1")
        );
    }
}