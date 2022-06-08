"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "embedsay";
        super(name, {
            aliases: [name, "esay", "embedwrap", "ewrap"],
            description: {
                content: "Repeats the message provided in the channel provided or the channel the command was execuetd in.",
                usage: '<"title"> <"message"> <channel?>'
            },
            args: [
                (0, Util_1.Arg)("title", "string"),
                (0, Util_1.Arg)("message", "string"),
                (0, Util_1.Arg)("channel", "textChannel", msg => msg.channel)
            ]
        });
    }
    exec(msg, { title, message, channel }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!title)
                this.client.Logger.MissingArgError(msg, "title");
            if (!message)
                this.client.Logger.MissingArgError(msg, "message");
            return message ?
                channel.send(this.client.Embed(title, undefined, message)).then(() => msg.delete())
                : this.client.Logger.MissingArgError(msg, "message");
        });
    }
}
exports.default = default_1;
