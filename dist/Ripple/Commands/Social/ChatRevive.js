"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "chatrevive";
        super(name, {
            aliases: [name, "revivechat", "makeactive", "heyeveryone"],
            cooldown: 60e3,
            ratelimit: 2,
            userPermissions: "ADMINISTRATOR",
            description: {
                content: "Pings the role set for chat revive, or @everyone.",
                usage: '<"message">'
            },
            args: [(0, Util_1.Arg)("message", "string")]
        });
    }
    exec(msg, { message }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!message)
                return this.client.Logger.MissingArgError(msg, "message");
            const roleID = yield this.client.ChatReviveRole.Get(msg);
            msg.delete();
            return msg.channel.send(roleID ? (0, Util_1.Role)(roleID) : "@everyone")
                .then(() => msg.reply(this.client.Embed("Chat Revive")
                .setAuthor(`Initiated by ${msg.author.tag}`)
                .setDescription(message)));
        });
    }
}
exports.default = default_1;
