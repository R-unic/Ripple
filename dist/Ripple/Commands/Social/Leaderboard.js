"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "leaderboard";
        super(name, {
            aliases: [name, "leader", "top", "lb", "leadertop"],
            ratelimit: 2,
            description: "Returns a list of the top stats in the guild."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const leaderboard = (yield this.client.Stats.GetLeaderboard(msg.member))
                .map((m, i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const level = yield this.client.Stats.GetLevel(m);
                const prestige = yield this.client.Stats.GetPrestige(m);
                return `**${i + 1}.** ${m} [${(prestige !== 0 ? `${(0, Util_1.RomanNumeral)(prestige)}-` : "") + (level === 100 ? `${level} (max)` : level)}]`;
            }));
            let leaderboardText = "";
            for (const m of leaderboard.slice(0, 20))
                leaderboardText += (yield m) + "\n";
            return msg.channel.send(this.client.Embed("Levels Leaderboard for `" + msg.guild.name + "`")
                .setDescription(leaderboardText.trim())
                .setThumbnail(msg.guild.iconURL({ dynamic: true })));
        });
    }
}
exports.default = default_1;
