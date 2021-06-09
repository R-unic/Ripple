import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg, CommaNumber } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "addlevels";
        super(name, {
            aliases: [name, "addlvls"],
            cooldown: 20e3,
            ratelimit: 2,
            userPermissions: "ADMINISTRATOR",
            description: {
                content: "Adds an amount of levels to a user's profile.",
                usage: "<levels> <@user?>"
            },
            args: [ 
                Arg("levels", "number"),
                Arg("user", "member", msg => msg.member)
            ]
        });
    }

    public async exec(msg: Message, { levels, user }: { levels: number, user: GuildMember }) {
        const min = 1, max = 99;
        if (levels > max)
            levels = max;
        else if (levels < min)
            levels = min;

        const curLvl = await this.client.Stats.GetLevel(user);
        if (curLvl + levels > 100) {
            const sub = (curLvl + levels) - 100;
            levels -= sub;
        }

        return this.client.Stats.AddLevel(user, levels)
            .then(() => msg.reply(
                this.client.Success(`Successfully added \`${CommaNumber(levels)}\` levels to ${user}.`)
            ));
    }
}