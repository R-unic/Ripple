"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "givepremium";
        super(name, {
            aliases: [name, "awardpremium", "giveripplepremium", "awardripplepremium"],
            ownerOnly: true,
            description: {
                content: "Gives a user Ripple Premium for free.",
                usage: "<@user?>"
            },
            args: [(0, Util_1.Arg)("member", "member", msg => msg.member)]
        });
    }
    exec(msg, { member }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!member)
                return this.client.Logger.MissingArgError(msg, "user");
            const user = member.user;
            const hasPremium = yield this.client.Premium.Has(user);
            if (hasPremium)
                return this.client.Logger.InvalidArgError(msg, "User already has Premium.");
            return this.client.Premium.Set(user, true)
                .then(() => msg.reply(this.client.Success(`Successfully gave ${member} Ripple Premium.`)));
        });
    }
}
exports.default = default_1;
