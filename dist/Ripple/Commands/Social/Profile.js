"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "profile";
        super(name, {
            aliases: [name, "socialprofile", "stats", "rank", "level"],
            ratelimit: 2,
            description: {
                content: "Gets a user's or your own profile.",
                usage: "<@member?>"
            },
            args: [(0, Util_1.Arg)("member", "member", msg => msg.member)]
        });
    }
    exec(msg, { member }) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (member.user.bot)
                return this.client.Logger.InvalidArgError(msg, "Bots do not have profiles.");
            const prestige = yield this.client.Stats.GetPrestige(member);
            const level = yield this.client.Stats.GetLevel(member);
            const exp = yield this.client.Stats.GetXP(member);
            const untilNext = yield this.client.Stats.XPUntilNextLevel(member);
            const maxXPGain = yield this.client.Stats.MaxXPGain(member);
            // const totalXP = await this.client.Stats.GetTotalXP(member);
            const rank = yield this.client.Stats.GetLeaderboardRank(member);
            const reputation = yield this.client.Reputation.Get(member);
            const premium = yield this.client.Premium.Has(member.user);
            const status = yield this.client.AFK.Get(msg.member);
            try {
                return msg.channel.send(this.client.Embed(`${member.user.tag}'s Profile`)
                    .setThumbnail(member.user.avatarURL({ dynamic: true }))
                    .addField("Prestige", prestige === 0 ? prestige : (0, Util_1.RomanNumeral)(prestige), true)
                    .addField("Level", (prestige !== 0 ? `${(0, Util_1.RomanNumeral)(prestige)}-` : "") + (level === 100 ? `${level} (max)` : level), true)
                    .addField("Experience", level === 100 ? "MAX" : (0, Util_1.CommaNumber)(exp), true)
                    .addField("XP Until Next Level", level === 100 ? "MAX" : (0, Util_1.CommaNumber)(untilNext), true)
                    .addField("XP Gain", level === 100 ? "0" : "50 - " + (0, Util_1.CommaNumber)(maxXPGain), true)
                    .addField("Server Rank", `#${(0, Util_1.CommaNumber)(rank)}`, true)
                    .addField("Reputation", reputation, true)
                    .addField("AFK", status.AFK ? (_a = status.Message) !== null && _a !== void 0 ? _a : "No reason provided" : "No", true)
                    .addField("Ripple Premium", premium ? "Yes" : "No", true));
            }
            catch (err) {
                return this.client.Logger.UtilError(msg);
            }
        });
    }
}
exports.default = default_1;
