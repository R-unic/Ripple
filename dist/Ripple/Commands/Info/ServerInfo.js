"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "serverinfo";
        super(name, {
            aliases: [name, "guildinfo", "aboutserver"],
            description: "Returns information about the server executed in."
        });
    }
    exec(msg) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const guild = (_a = msg.guild) !== null && _a !== void 0 ? _a : msg.member.guild;
            return msg.reply(this.client.Embed(guild.name)
                .setDescription((_b = guild.description) !== null && _b !== void 0 ? _b : "")
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .addField("Members", guild.memberCount, true)
                .addField("Region", guild.region, true)
                .addField("Created On", (0, Util_1.StripISO)(guild.createdAt), true)
                .addField("Owner", (0, Util_1.User)(guild.ownerID), true)
                .addField("Nitro Boost Tier", guild.premiumTier, true)
                .addField("Partnered", guild.partnered ? "Yes" : "No", true)
                .addField("AFK Timeout", Math.round(guild.afkTimeout / 60) + " Minutes", true)
                .addField("AFK Channel", guild.afkChannel.name, true));
        });
    }
}
exports.default = default_1;
