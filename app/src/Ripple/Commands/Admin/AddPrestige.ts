import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg, CommaNumber } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "addprestige";
        super(name, {
            aliases: [name, "addprestigelevels", "addprestigelvls", "addacensions"],
            cooldown: 20e3,
            ratelimit: 2,
            userPermissions: "ADMINISTRATOR",
            description: {
                content: "Adds an amount of prestige to a user's profile.",
                usage: "<prestige> <@user?>"
            },
            args: [ 
                Arg("prestige", "number"),
                Arg("user", "member", msg => msg.member)
            ]
        });
    }

    public async exec(msg: Message, { prestige, user }: { prestige: number, user: GuildMember }) {
        const min = -(this.client.Stats.MaxPrestige - 1), max = this.client.Stats.MaxPrestige - 1;
        if (prestige > max)
            prestige = max;
        else if (prestige < min)
            prestige = min;

        const curPrestige = await this.client.Stats.GetPrestige(user);
        if (curPrestige + prestige > this.client.Stats.MaxPrestige || curPrestige - prestige < -this.client.Stats.MaxPrestige) {
            const sub = (curPrestige + prestige) - 100;
            prestige -= sub;
        }

        return this.client.Stats.AddPrestige(user, prestige)
            .then(() => msg.reply(
                this.client.Success(`Successfully added \`${CommaNumber(prestige)}\` prestige to ${user}.`)
            ));
    }
}