"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "commandcount";
        super(name, {
            aliases: [name, "cmdcount", "cc"],
            description: "Returns the amount of commands Ripple has implemented."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return msg.reply(this.client.Embed(`Ripple has \`${this.client.CommandCount}\` commands implemented.`));
        });
    }
}
exports.default = default_1;
