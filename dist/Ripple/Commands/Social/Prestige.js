"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "prestige";
        super(name, {
            aliases: [name, "ascend", "evolve"],
            cooldown: 3e3,
            ratelimit: 2,
            description: "Resets level to 1 and adds one prestige rank for a permanent XP boost based on your prestige."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = msg.member;
            if ((yield this.client.Stats.GetPrestige(user)) === this.client.Stats.MaxPrestige)
                return this.client.Logger.LevelSystemError(msg, "Cannot prestige; you are the maximum prestige level.");
            if ((yield this.client.Stats.GetLevel(user)) !== this.client.Stats.MaxLevel)
                return this.client.Logger.LevelSystemError(msg, `Cannot prestige; you aren't level \`${this.client.Stats.MaxLevel}\`.`);
            return this.client.Stats.AddPrestige(user)
                .then(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                return msg.reply(this.client.Embed("Prestiged!", "🌟")
                    .setDescription(`You are now prestige \`${yield this.client.Stats.GetPrestige(msg.member)}\`!`));
            }));
        });
    }
}
exports.default = default_1;
