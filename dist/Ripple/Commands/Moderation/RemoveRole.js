"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "removerole";
        super(name, {
            aliases: [name, "deleterole", "delrole", "unrole", "unrank", "demote"],
            userPermissions: "MANAGE_ROLES",
            clientPermissions: "MANAGE_ROLES",
            cooldown: 5e3,
            description: {
                content: "Removes a role from a member.",
                usage: "<@member> <@role>"
            },
            args: [
                (0, Util_1.Arg)("role", "role"),
                (0, Util_1.Arg)("member", "member", msg => msg.member)
            ],
        });
    }
    exec(msg, { role, member }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!member)
                return this.client.Logger.MissingArgError(msg, "member");
            if (!role)
                return this.client.Logger.MissingArgError(msg, "role");
            return member.roles.remove(role)
                .then(() => msg.reply(this.client.Success()
                .setDescription(`Successfully removed ${role} from ${member}.`))).catch(err => this.client.Logger.DiscordAPIError(msg, err));
        });
    }
}
exports.default = default_1;
