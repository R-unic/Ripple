"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "setautorole";
        super(name, {
            aliases: [name, "setjoinrole", "autorole", "joinrole"],
            userPermissions: "MANAGE_ROLES",
            clientPermissions: "MANAGE_ROLES",
            cooldown: 3e3,
            description: {
                content: "Sets a role to be assigned upon a user joining.",
                usage: "<@role?>"
            },
            args: [(0, Util_1.Arg)("role", "role")],
        });
    }
    exec(msg, { role }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!role) {
                yield this.client.AutoRole.Set(msg, undefined);
                return msg.reply(this.client.Success("Successfully disabled autorole."));
            }
            return this.client.AutoRole.Set(msg, role.id)
                .then(() => msg.reply(this.client.Success(`Successfully set autorole to ${role}.`))).catch(err => this.client.Logger.DatabaseError(msg, err));
        });
    }
}
exports.default = default_1;
