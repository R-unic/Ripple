"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "userinfo";
        super(name, {
            aliases: [name, "memberinfo", "whois", "identify"],
            description: {
                content: "Returns information about the user provided, or yourself.",
                usage: "<@member?>"
            },
            args: [(0, Util_1.Arg)("member", "member", msg => msg.member)]
        });
    }
    exec(msg, { member }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return msg.reply(this.client.Embed()
                .setAuthor(member.user.username + "#" + member.user.discriminator, member.user.avatarURL({ dynamic: true }))
                .setDescription(member)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .addField("Joined Discord On", (0, Util_1.StripISO)(member.user.createdAt), true)
                .addField("Joined Server On", (0, Util_1.StripISO)(member.joinedAt), true)
                .addField("Nitro Since", member.premiumSince ? (0, Util_1.StripISO)(member.premiumSince) : "Never", true)
                .addField("Roles", member.roles.cache.array().join(" "), true)
                .addField("Manageable", member.manageable ? "Yes" : "No", true)
                .addField("Ripple Premium", this.client.Premium.Has(member.user) ? "Yes" : "No", true)
                .setColor(msg.member.displayHexColor));
        });
    }
}
exports.default = default_1;
