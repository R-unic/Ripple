"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "roleinfo";
        super(name, {
            aliases: [name, "aboutrole"],
            description: {
                content: "Returns information about the role specified.",
                usage: "<@role>"
            },
            args: [(0, Util_1.Arg)("role", "role")]
        });
    }
    exec(msg, { role }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!role)
                return this.client.Logger.MissingArgError(msg, "role");
            return msg.reply(this.client.Embed()
                .setTitle(`Information About \`${role.name}\` Role`)
                .setColor(role.hexColor)
                .addField("Created On", (0, Util_1.StripISO)(role.createdAt), true)
                .addField("Mentionable", role.mentionable ? "Yes" : "No", true)
                .addField("Members", role.members.map(m => `@${m.user.tag}`).join(", "), true)
                .addField("Permissions", role.permissions.toArray().join(", "), true));
        });
    }
}
exports.default = default_1;
