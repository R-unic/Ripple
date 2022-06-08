"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "unban";
        super(name, {
            aliases: [name, "unbanish"],
            userPermissions: "BAN_MEMBERS",
            clientPermissions: "BAN_MEMBERS",
            cooldown: 5e3,
            description: {
                content: "Unbans a member from the server.",
                usage: "<@member> <reason?>"
            },
            args: [
                (0, Util_1.Arg)("member", "user"),
                (0, Util_1.Arg)("reason", "string")
            ],
        });
    }
    exec(msg, { member, reason }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!member)
                return this.client.Logger.MissingArgError(msg, "member");
            const bans = yield msg.guild.fetchBans();
            const ban = yield bans.find(ban => ban.user === member);
            if (!ban)
                return this.client.Logger.InvalidArgError(msg, "User is not banned from this server or never joined.");
            return msg.guild.members.unban(ban.user, reason)
                .then(unbannedUser => msg.reply(this.client.Success(`\`@${unbannedUser.tag}\` was successfully unbanned.`)
                .addField("Reason", reason !== null && reason !== void 0 ? reason : "n/a"))).catch(err => this.client.Logger.DiscordAPIError(msg, err));
        });
    }
}
exports.default = default_1;
