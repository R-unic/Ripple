"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "resetstats";
        super(name, {
            aliases: [name, "resetstatistics", "resetlevels"],
            ownerOnly: true,
            description: {
                content: "Resets a user's or your own stats.",
                usage: "<@user?>"
            },
            args: [(0, Util_1.Arg)("user", "member", msg => msg.member)]
        });
    }
    exec(msg, { user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.client.Stats.Set(user, {
                Prestige: 0,
                Level: 1,
                XP: 0
            }).then(() => msg.reply(this.client.Success(`Successfully reset ${user}'s stats.`))).catch(err => this.client.Logger.DatabaseError(msg, err));
        });
    }
}
exports.default = default_1;
