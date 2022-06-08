"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "togglefiltering";
        super(name, {
            aliases: [name, "togglechatfiltering", "togglechatfilter", "togglefilter"],
            cooldown: 5e3,
            description: "Toggles the chat filtering system on/off."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.client.Filtering.Toggle(msg)
                .then(toggled => msg.reply(this.client.Success(`Successfully ${toggled ? "enabled" : "disabled"} the level system for this server.`)));
        });
    }
}
exports.default = default_1;
