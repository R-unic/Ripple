"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "setchatreviverole";
        super(name, {
            aliases: [name, "chatreviverole"],
            cooldown: 5e3,
            description: {
                content: "Sets the role to be pinged when `::chatrevive` is used, or resets it.",
                usage: "<@role?>"
            },
            args: [(0, Util_1.Arg)("role", "role", msg => msg.guild.roles.everyone)]
        });
    }
    exec(msg, { role }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.client.ChatReviveRole.Set(msg, role.id)
                .then(() => msg.reply(this.client.Success(role ? `Successfully set chat revive role to ${role}.` : `Successfully reset chat revive role to ${msg.guild.roles.everyone}.`)));
        });
    }
}
exports.default = default_1;
