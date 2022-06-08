"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "unmute";
        super(name, {
            aliases: [name, "unsilence"],
            userPermissions: "MANAGE_MESSAGES",
            clientPermissions: "MANAGE_ROLES",
            cooldown: 5e3,
            description: {
                content: "Unmutes a member in the server.",
                usage: "<@member>"
            },
            args: [(0, Util_1.Arg)("member", "member")]
        });
    }
    exec(msg, { member }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!member)
                return this.client.Logger.MissingArgError(msg, "member");
            const muted = msg.guild.roles.cache.find(r => r.name.includes("Mute"));
            if (!muted)
                return this.client.Logger.CouldNotBeExecutedError(msg, "'Muted' role does not exist, use `::mute <@user> <timePeriod?>` to create it automatically.");
            return member.roles.remove(muted, "Unmuted")
                .then(unmutedMember => {
                this.client.AddModLog(member, "Mute Revoked", member);
                msg.reply(this.client.Success(`${unmutedMember} was successfully unmuted.`));
            }).catch(err => this.client.Logger.DiscordAPIError(msg, err));
        });
    }
}
exports.default = default_1;
