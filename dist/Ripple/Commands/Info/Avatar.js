"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "avatar";
        super(name, {
            aliases: [name, "pfp", "profilepic", "useravatar", "av"],
            description: {
                content: "Returns a user's avatar or your own.",
                usage: "<@user?>"
            },
            args: [(0, Util_1.Arg)("member", "member", msg => msg.member)]
        });
    }
    exec(msg, { member }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return msg.reply(this.client.Embed()
                .setTitle(`\`${member.user.tag}\`'s Avatar`)
                .setImage(member.user.displayAvatarURL({ dynamic: true }))
                .setColor(member.displayHexColor));
        });
    }
}
exports.default = default_1;
