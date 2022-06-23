import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg, CommaNumber, RomanNumeral } from "../../Util";
import Ripple from "../../Client";
import ms from "ms";
import { isJSDocThisTag } from "typescript";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "profile";
        super(name, {
            aliases: [name, "socialprofile", "stats", "rank", "level"],
            ratelimit: 2,
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

        const prestige = await this.client.Stats.GetPrestige(member)
        const level = await this.client.Stats.GetLevel(member);
        const exp = await this.client.Stats.GetXP(member);
        const untilNext = await this.client.Stats.XPUntilNextLevel(member);
        const maxXPGain = await this.client.Stats.MaxXPGain(member);
        // const totalXP = await this.client.Stats.GetTotalXP(member);
        const rank = await this.client.Stats.GetLeaderboardRank(member);
        const reputation = await this.client.Reputation.Get(member);
        const premium = await this.client.Premium.Has(member.user);
        const status = await this.client.AFK.Get(msg.member);

        try {
            return msg.channel.send(
                this.client.Embed(`${member.user.tag}'s Profile`)
                    .setThumbnail(member.user.avatarURL({ dynamic: true }))
                    .addField("Prestige", prestige === 0 ? prestige : RomanNumeral(prestige), true)
                    .addField("Level", (prestige !== 0 ? `${RomanNumeral(prestige)}-` : "") + (level === 100 ? `${level} (max)` : level), true)
                    .addField("Experience", level === 100 ? "MAX" : CommaNumber(exp), true)
                    .addField("XP Until Next Level", level === 100 ? "MAX" : CommaNumber(untilNext), true)
                    .addField("XP Gain", level === 100 ? "0" : "50 - " + CommaNumber(maxXPGain), true)
                    .addField("Server Rank", `#${CommaNumber(rank)}`, true)
                    .addField("Reputation", reputation, true)
                    .addField("AFK", status.AFK ? status.Message ?? "No reason provided" : "No", true)
                    .addField("Ripple Premium", premium ? "Yes" : "No", true)
            );
        } catch (err) {
            return this.client.Logger.UtilError(msg);
        }
    }
}