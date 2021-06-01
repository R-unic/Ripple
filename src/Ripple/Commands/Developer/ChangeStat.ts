import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "changestat";
        super(name, {
            aliases: [name, "changestatistic", "editstat"],
            ownerOnly: true,
            description: {
                content: "Changes a user's or your own's stat provided.",
                usage: "<stat: 'Level' | 'XP' | 'Prestige'> <value> <@user?>"
            },
            args: [ 
                Arg("stat", "lowercase"),
                Arg("value", "number"),
                Arg("user", "member", msg => msg.member) 
            ]
        });
    }

    public async exec(msg: Message, { stat, value, user }: { stat: string, value: number, user: GuildMember }) {
        if (!stat)
            return this.client.Logger.MissingArgError(msg, "stat");

        if (!value)
            return this.client.Logger.MissingArgError(msg, "value");

        switch(stat) {
            case "prestige": await this.client.Stats.SetPrestige(user, value);
            case "level": await this.client.Stats.SetLevel(user, value);
            case "xp": await this.client.Stats.SetXP(user, value);
        }

        return msg.reply(
            this.client.Success(`Successfully changed \`${stat}\` to \`${value}\` for ${user}.`)
        ); 
    }
}