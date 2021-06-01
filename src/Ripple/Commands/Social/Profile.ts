import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";
import ms from "ms";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "profile";
        super(name, {
            aliases: [name, "socialprofile", "stats"],
            cooldown: 3,
            description: {
                content: "Gets a user's or your own profile.",
                usage: "<@member?>"
            },
            args: [ Arg("member", "member", msg => msg.member) ]
        });
    }

    public async exec(msg: Message, { member }: { member: GuildMember }) {
        if (member.user.bot)
            return this.client.Logger.InvalidArgError(msg, "Bots do not have profiles.");

        setTimeout(async () => {
            const prestige = await this.client.Stats.GetPrestige(member);
            const level = await this.client.Stats.GetLevel(member);
            const xp = await this.client.Stats.GetXP(member);
            const untilNext = await this.client.Stats.XPUntilNextLevel(member);
            const rep = await this.client.Reputation.Get(member);
            
            return msg.channel.send(
                this.client.Embed(`${member.user.tag}'s Profile`)
                    .setThumbnail(member.user.avatarURL({ dynamic: true }))
                    .addField("Prestige", prestige, true)
                    .addField("Level", level, true)
                    .addField("Experience", xp, true)
                    .addField("XP Until Next Level", untilNext, true)
                    .addField("Reputation", rep, true)
            );
        }, ms(".5s"));
    }
}