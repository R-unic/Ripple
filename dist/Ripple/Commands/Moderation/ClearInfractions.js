"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "clearinfractions";
        super(name, {
            aliases: [name, "removeinfractions", "removewarnings", "clearwarnings", "clearwarn"],
            userPermissions: "MANAGE_MESSAGES",
            cooldown: 3e3,
            description: {
                content: "Clears all of a member's infractions.",
                usage: "<@member>"
            },
            args: [(0, Util_1.Arg)("member", "member")]
        });
    }
    exec(msg, { member }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!member)
                return this.client.Logger.MissingArgError(msg, "member");
            if (member.user.bot)
                return this.client.Logger.InvalidArgError(msg, "Bots do not receive infractions.");
            return this.client.Infractions.Clear(member)
                .then(amount => msg.reply(this.client.Success(amount !== 0 ?
                `Successfully cleared \`${amount}\` infractions from ${member}.`
                : `${member} has no infractions, removed nothing.`)));
        });
    }
}
exports.default = default_1;
