"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "npm";
        super(name, {
            aliases: [name, "npmpackage", "npmpkg"],
            description: "Returns Ripple's NPM package link."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return msg.reply(this.client.Embed()
                .setTitle("ripple-discord-ts")
                .setURL("https://www.npmjs.com/package/ripple-discord-ts")
                .setThumbnail("https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png"));
        });
    }
}
exports.default = default_1;
