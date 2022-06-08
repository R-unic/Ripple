"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
const ms_1 = tslib_1.__importDefault(require("ms"));
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "mute";
        super(name, {
            aliases: [name, "silence", "stfu", "sthu", "shutup", "quiet"],
            userPermissions: "MANAGE_MESSAGES",
            clientPermissions: "MANAGE_ROLES",
            cooldown: 5e3,
            description: {
                content: "Mutes a member in the server.",
                usage: "<@member> <timePeriod?>"
            },
            args: [
                (0, Util_1.Arg)("member", "member"),
                (0, Util_1.Arg)("timePeriod", "string")
            ],
        });
    }
    exec(msg, { member, timePeriod }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!member)
                return this.client.Logger.MissingArgError(msg, "member");
            if (member === msg.member)
                return this.client.Logger.InvalidArgError(msg, "You cannot mute yourself.");
            if (member === msg.guild.owner)
                return this.client.Logger.InvalidArgError(msg, "You cannot mute the server owner.");
            const muted = msg.guild.roles.cache.find(r => r.name.includes("Mute")) || (yield msg.guild.roles.create({
                data: {
                    name: "Muted",
                    color: "DARK_BUT_NOT_BLACK",
                    permissions: [
                        "VIEW_CHANNEL",
                        "CONNECT",
                        "READ_MESSAGE_HISTORY"
                    ]
                }, reason: "Mute command"
            }));
            const timeMS = timePeriod ?
                (0, ms_1.default)(timePeriod)
                : undefined;
            if (timeMS)
                setTimeout(() => member.roles.remove(muted, "Unmuted")
                    .then(member => msg.reply(this.client.Success(`${member} was successfully unmuted.`))), timeMS);
            return member.roles.add(muted, "Muted")
                .then(mutedMember => {
                this.client.AddModLog(member, "Mute Issued", member);
                msg.reply(this.client.Success(`${mutedMember} was successfully muted ${timeMS ? `for \`${timePeriod}\`` : "until they are unmuted"}.`));
            }).catch(err => this.client.Logger.DiscordAPIError(msg, err));
        });
    }
}
exports.default = default_1;
