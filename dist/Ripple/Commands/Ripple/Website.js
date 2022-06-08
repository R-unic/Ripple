"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "website";
        super(name, {
            aliases: [name, "ripplewebsite", "homepage"],
            description: "Returns the link to Ripple's website."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return msg.reply(this.client.Embed()
                .setTitle("Ripple Website")
                .setDescription("An all-purpose Discord bot built with TypeScript")
                .setURL("https://alpharunic.github.io/Ripple"));
        });
    }
}
exports.default = default_1;
