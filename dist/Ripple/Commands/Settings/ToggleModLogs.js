"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "togglemodlogs";
        super(name, {
            aliases: [name, "modlogs"],
            cooldown: 5e3,
            description: "Toggles the moderator logging system on/off."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.client.ModLogs.Toggle(msg)
                .then(toggled => msg.reply(this.client.Success(`Successfully ${toggled ? "enabled" : "disabled"} moderator logging for this server. Use \`${this.prefix}modlogschannel #channel\` to assign a channel.`)));
        });
    }
}
exports.default = default_1;
