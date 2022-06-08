"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "prestigerole";
        super(name, {
            aliases: [name, "setprestigerole", "assignprestigerole"],
            userPermissions: "MANAGE_ROLES",
            clientPermissions: "MANAGE_ROLES",
            cooldown: 5e3,
            description: {
                content: "Sets a role to be assigned upon a user reaching provided prestige, or resets a previous assignment.",
                usage: "<@role> <prestige?>"
            },
            args: [
                (0, Util_1.Arg)("role", "role"),
                (0, Util_1.Arg)("prestige", "number")
            ],
        });
    }
    exec(msg, { role, prestige }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!role)
                return this.client.Logger.MissingArgError(msg, "role");
            if (!prestige) {
                const rolesPrestige = yield this.client.PrestigeRoles.Get(role);
                if (!rolesPrestige)
                    return this.client.Logger.InvalidArgError(msg, "Role provided is not assigned to any prestige level.");
                return this.client.PrestigeRoles.Set(role, undefined)
                    .then(() => msg.reply(this.client.Success(`Successfully unassigned ${role} from prestige \`${rolesPrestige}\`.`)));
            }
            else
                return this.client.PrestigeRoles.Set(role, prestige)
                    .then(() => msg.reply(this.client.Success(`Successfully assigned ${role} to prestige \`${prestige}\`.`)));
        });
    }
}
exports.default = default_1;
