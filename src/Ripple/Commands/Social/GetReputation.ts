import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "getreputation";
        super(name, {
            aliases: [name, "getrep", "findrep"],
            cooldown: 3,
            description: {
                content: "Gets a user's or your reputation.",
                usage: "<@member?>"
            },
            args: [
                Arg("member", "member", msg => msg.member),
            ],
        });
    }

    public async exec(msg: Message, { member }: { member: GuildMember }) {
        if (member.user.bot)
            return this.client.Logger.InvalidArgError(msg, "Bots do not gain reputation.");

        return msg.channel.send(`${member} has ${await this.client.Reputation.Get(member)} reputation.`)
    }
}