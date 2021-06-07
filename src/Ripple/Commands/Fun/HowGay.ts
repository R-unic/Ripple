import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg, RandomInt, RandomUser } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "howgay";
        super(name, {
            aliases: [name, "gaymeter", "gayometer", "gaydar", "gay"],
            description: {
                content: "Returns how gay another user or a random user is.",
                usage: "<@user?>"
            },
            args: [ Arg("member", "user", RandomUser) ]
        });
    }

    public async exec(msg: Message, { member }: { member: GuildMember }) {
        const gayness = RandomInt(100);
        return msg.reply(
            this.client.Embed("Gaydar", "🏳️‍🌈")
                .setDescription(`${member} is ${gayness}% gay. 🏳️‍🌈`)
        );
    }
}