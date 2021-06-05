import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "resetstats";
        super(name, {
            aliases: [name, "resetstatistics", "resetlevels"],
            ownerOnly: true,
            description: {
                content: "Resets a user's or your own stats.",
                usage: "<@user?>"
            },
            args: [ Arg("user", "member", msg => msg.member) ]
        });
    }

    public async exec(msg: Message, { user }: { user: GuildMember }) {
        return this.client.Stats.Set(user, {
            Prestige: 0,
            Level: 1,
            XP: 0
        }).then(() => msg.reply(
            this.client.Success(`Successfully reset ${user}'s stats.`)
        )).catch(err => this.client.Logger.DatabaseError(msg, err));
    }
}