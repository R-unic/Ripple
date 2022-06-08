"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "stopcommandlooping";
        super(name, {
            aliases: [name, "stopcommandloops", "disablecommandloop", "unloopcommands", "stopcommandloop", "unloopcommand"],
            description: "Loops a command for a given time period.",
            ownerOnly: true
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.client.CancelCommandLoop = true;
            return msg.reply(this.client.Success("Successfully stopped all command loops."));
        });
    }
}
exports.default = default_1;
