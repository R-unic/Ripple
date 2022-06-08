"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "softban";
        super(name, {
            aliases: [name, "softbanish", "tempbanish", "tempban"],
            userPermissions: "BAN_MEMBERS",
            clientPermissions: "BAN_MEMBERS",
            cooldown: 5e3,
            description: {
                content: "Banishes a member from the server temporarily.",
                usage: "<@member> <days> <reason?>"
            },
            args: [
                (0, Util_1.Arg)("member", "member"),
                (0, Util_1.Arg)("days", "number"),
                (0, Util_1.Arg)("reason", "string")
            ],
        });
    }
    exec(msg, { member, days, reason }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!member)
                return this.client.Logger.MissingArgError(msg, "member");
            if (!days)
                return this.client.Logger.MissingArgError(msg, "days");
            if (member === msg.member)
                return this.client.Logger.InvalidArgError(msg, "You cannot softban yourself.");
            if (member === msg.guild.owner)
                return this.client.Logger.InvalidArgError(msg, "You cannot softban the server owner.");
            return member.ban({
                reason: reason,
                days: days
            }).then(bannedMember => msg.reply(this.client.Success(`${bannedMember.user.tag} was successfully softbannedbanned.`)
                .addField("Reason", reason !== null && reason !== void 0 ? reason : "n/a", true)
                .addField("Days", days, true))).catch(err => this.client.Logger.DiscordAPIError(msg, err));
        });
    }
}
exports.default = default_1;
