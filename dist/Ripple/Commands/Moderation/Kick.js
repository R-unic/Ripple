"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "kick";
        super(name, {
            aliases: [name, "purgemember", "purgeuser"],
            userPermissions: "KICK_MEMBERS",
            clientPermissions: "KICK_MEMBERS",
            cooldown: 5e3,
            description: {
                content: "Kicks a member from the server.",
                usage: "<@member> <reason?>"
            },
            args: [
                (0, Util_1.Arg)("member", "member"),
                (0, Util_1.Arg)("reason", "string")
            ],
        });
    }
    exec(msg, { member, reason }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!member)
                return this.client.Logger.MissingArgError(msg, "member");
            if (member === msg.member)
                return this.client.Logger.InvalidArgError(msg, "You cannot kick yourself.");
            if (member === msg.guild.owner)
                return this.client.Logger.InvalidArgError(msg, "You cannot kick the server owner.");
            return member.kick(reason)
                .then(kickedMember => msg.reply(this.client.Success(`${kickedMember} was successfully kicked.`)
                .addField("Reason", reason !== null && reason !== void 0 ? reason : "n/a"))).catch(err => this.client.Logger.DiscordAPIError(msg, err));
        });
    }
}
exports.default = default_1;
