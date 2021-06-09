import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg, CommaNumber } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "addxp";
        super(name, {
            aliases: [name, "addexp", "addexperience"],
            cooldown: 20e3,
            ratelimit: 2,
            userPermissions: "ADMINISTRATOR",
            description: {
                content: "Adds an amount of experience to a user's profile.",
                usage: "<xp> <@user?>"
            },
            args: [ 
                Arg("xp", "number"),
                Arg("user", "member", msg => msg.member)
            ]
        });
    }

    public async exec(msg: Message, { xp, user }: { xp: number, user: GuildMember }) {
        const min = 1, max = 10000;
        if (xp > max)
            xp = max;
        else if (xp < min)
            xp = min;

        return this.client.Stats.AddXP(user, xp)
            .then(() => msg.reply(
                this.client.Success(`Successfully added \`${CommaNumber(xp)}\` XP to ${user}.`)
            ));
    }
}