"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "togglepurging";
        super(name, {
            aliases: [name, "togglepurge", "togglepurgecommand", "purgecommand"],
            cooldown: 5e3,
            description: "Toggles the Purge command on/off."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.client.Purge.Toggle(msg)
                .then(toggled => msg.reply(this.client.Success(`Successfully ${toggled ? "enabled" : "disabled"} the purge command for this server.`)));
        });
    }
}
exports.default = default_1;
