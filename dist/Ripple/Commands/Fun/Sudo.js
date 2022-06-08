"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "sudo";
        super(name, {
            aliases: [name, "say", "repeat", "echo"],
            description: {
                content: "Repeats the message provided in the channel provided or the channel the command was execuetd in.",
                usage: '<"message"> <channel?>'
            },
            args: [
                (0, Util_1.Arg)("message", "string"),
                (0, Util_1.Arg)("channel", "textChannel", msg => msg.channel)
            ]
        });
    }
    exec(msg, { message, channel }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            message ?
                channel.send(message)
                : this.client.Logger.MissingArgError(msg, "message");
            return msg.delete();
        });
    }
}
exports.default = default_1;
