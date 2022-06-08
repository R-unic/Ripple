"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "leaveserver";
        super(name, {
            aliases: [name, "exitserver", "leave"],
            description: "Forces Ripple to leave the server.",
            ownerOnly: true
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return msg.reply(this.client.Success("Successfully left the guild.")).then(() => msg.guild.leave());
        });
    }
}
exports.default = default_1;
