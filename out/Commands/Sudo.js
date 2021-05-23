"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class Sudo extends discord_akairo_1.Command {
    constructor() {
        const name = "sudo";
        super(name, {
            aliases: [name, "say", "repeat", "echo"],
            args: [
                {
                    id: "message",
                    type: "string"
                }
            ]
        });
    }
    async exec(msg, args) {
        msg.channel.send(args.message);
        return msg.delete();
    }
}
exports.default = Sudo;
//# sourceMappingURL=Sudo.js.map