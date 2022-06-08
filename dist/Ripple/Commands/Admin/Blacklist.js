"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "blacklist";
        super(name, {
            aliases: [name, "blist", "bl"],
            description: {
                content: "Blacklists a guild member from using Ripple command.",
                usage: '<@member>'
            },
            args: [
                (0, Util_1.Arg)("member", "<@member>")
            ]
        });
    }
    exec(msg, { member }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!member)
                this.client.Logger.MissingArgError(msg, "member");
            const blacklisted = yield this.client.UserBlacklist.Get(member);
            return this.client.UserBlacklist.Set(member, !blacklisted)
                .then(() => msg.reply(this.client.Success(`Successfully ${blacklisted ? "blacklist" : "unblacklist"}ed ${member}`)));
        });
    }
}
exports.default = default_1;
