import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg, CommaNumber, RomanNumeral } from "../../Util";
import Ripple from "../../Client";
import ms from "ms";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "profile";
        super(name, {
            aliases: [name, "socialprofile", "stats"],
            cooldown: 3e3,
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
            const prestige = await this.client.Stats.GetPrestige(member)
            const level = await this.client.Stats.GetLevel(member);
            const xp = await this.client.Stats.GetXP(member);
            const untilNext = await this.client.Stats.XPUntilNextLevel(member);
            const rep = await this.client.Reputation.Get(member);

            try {
                return msg.channel.send(
                    this.client.Embed(`${member.user.tag}'s Profile`)
                        .setThumbnail(member.user.avatarURL({ dynamic: true }))
                        .addField("Prestige", prestige === 0 ? prestige : RomanNumeral(prestige), true)
                        .addField("Level", (prestige !== 0 ? `${RomanNumeral(prestige)}-` : "") + (level === 100 ? `${level} (max)` : level), true)
                        .addField("Experience", level === 100 ? "MAX" : CommaNumber(xp), true)
                        .addField("XP Until Next Level", level === 100 ? "MAX" : CommaNumber(untilNext), true)
                        .addField("Reputation", rep, true)
                        .addField("Ripple Premium", (await this.client.Premium.Get(member.user)) ? "Yes" : "No")
                );
            } catch (err) {
                return this.client.Logger.UtilError(msg);
            }
        }, ms(".5s"));
    }
}