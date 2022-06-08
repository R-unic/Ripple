"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "poll";
        super(name, {
            aliases: [name, "newpoll"],
            userPermissions: "MANAGE_GUILD",
            cooldown: 5e3,
            ratelimit: 2,
            description: {
                content: "Returns a poll with 2 reactions.",
                usage: '<"pollQuestion">'
            },
            args: [(0, Util_1.Arg)("pollQuestion", "string")]
        });
    }
    exec(msg, { pollQuestion }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!pollQuestion)
                return this.client.Logger.MissingArgError(msg, "pollQuestion");
            return msg.reply(this.client.Embed()
                .setTitle("📈 Poll 📈")
                .setDescription(pollQuestion + "?")).then(sent => {
                sent.react("👍");
                return sent;
            }).then(sent => sent.react("👎"));
        });
    }
}
exports.default = default_1;
