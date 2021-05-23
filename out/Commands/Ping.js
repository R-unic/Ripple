"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class Ping extends discord_akairo_1.Command {
    constructor() {
        const name = "ping";
        super(name, {
            aliases: [name, "test"]
        });
    }
    async exec(msg) {
        return msg.reply("Pong!");
    }
}
exports.default = Ping;
//# sourceMappingURL=Ping.js.map