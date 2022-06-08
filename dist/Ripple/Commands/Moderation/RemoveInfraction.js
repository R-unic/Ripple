"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "removeinfraction";
        super(name, {
            aliases: [name, "removewarning"],
            userPermissions: "MANAGE_MESSAGES",
            cooldown: 3e3,
            description: {
                content: "Returns a list of a member's infractions.",
                usage: "<@member> <warningNumber>"
            },
            args: [
                (0, Util_1.Arg)("member", "member"),
                (0, Util_1.Arg)("warningNumber", "number")
            ]
        });
    }
    exec(msg, { member, warningNumber }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!member)
                return this.client.Logger.MissingArgError(msg, "member");
            if (!warningNumber)
                return this.client.Logger.MissingArgError(msg, "warningNumber");
            if (member.user.bot)
                return this.client.Logger.InvalidArgError(msg, "Bots do not receive infractions.");
            if (member === msg.member)
                return this.client.Logger.InvalidArgError(msg, "You cannot remove your own infractions.");
            const infraction = yield this.client.Infractions.Find(member, warningNumber);
            if (!infraction)
                return this.client.Logger.InvalidArgError(msg, `Could not find infraction with index \`${warningNumber}\`.`);
            return this.client.Infractions.Remove(member, infraction)
                .then(() => {
                this.client.AddModLog(member, "Warning Revoked", member);
                msg.reply(this.client.Success(`Successfully removed infraction issued by \`@${infraction.Issuer.displayName}.\``));
            });
        });
    }
}
exports.default = default_1;
