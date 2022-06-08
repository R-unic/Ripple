"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "version";
        super(name, {
            aliases: [name, "rippleversion", "ripplevsn", "vsn", "v"],
            description: "Returns information about Ripple."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return msg.reply(this.client.Embed(`Ripple v${this.client.Package.version}`));
        });
    }
}
exports.default = default_1;
