"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
const InfractionManager_1 = require("../../Components/DataManagement/Managers/GuildMember/InfractionManager");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "warn";
        super(name, {
            aliases: [name, "addinfraction", "addwarning", "newinfraction", "newwarning"],
            userPermissions: "MANAGE_MESSAGES",
            cooldown: 5e3,
            description: {
                content: "Warns a member, adding an infraction.",
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
            if (member.user.bot)
                return this.client.Logger.InvalidArgError(msg, "You cannot warn a bot.");
            if (member === msg.member)
                return this.client.Logger.InvalidArgError(msg, "You cannot warn yourself.");
            if (member === msg.guild.owner)
                return this.client.Logger.InvalidArgError(msg, "You cannot warn the server owner.");
            return this.client.Infractions.Add(member, new InfractionManager_1.Infraction(msg.member, member, reason !== null && reason !== void 0 ? reason : "No reason provided.")).then(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                this.client.AddModLog(member, "Warning Issued", member);
                const infractions = yield this.client.Infractions.Get(member);
                const infractionAmount = infractions.length;
                const kickWarning = infractionAmount === 4;
                const banWarning = infractionAmount === 8;
                if (kickWarning)
                    yield member.kick(reason)
                        .catch(err => this.client.Logger.DiscordAPIError(msg, err));
                if (kickWarning)
                    yield member.ban({ reason: reason })
                        .then(() => this.client.Infractions.Clear(member))
                        .catch(err => this.client.Logger.DiscordAPIError(msg, err));
                return msg.reply(this.client.Success(kickWarning ?
                    `Successfully kicked \`${member.user.tag}\`. This was their \`4th\` infraction.`
                    : (banWarning ?
                        `Successfully banned \`${member.user.tag}\`. This was their \`8th\` infraction.`
                        : `Successfully warned \`${member.user.tag}\`. This is infraction number \`${infractionAmount}\`.`))).catch(err => this.client.Logger.UtilError(msg, err));
            }));
        });
    }
}
exports.default = default_1;
