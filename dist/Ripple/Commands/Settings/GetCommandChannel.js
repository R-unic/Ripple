"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "getcommandchannel";
        super(name, {
            aliases: [name, "getcmdchannel", "currentcommandchannel", "currentcmdchannel"],
            cooldown: 3e3,
            ratelimit: 2,
            description: "Returns the channel that bot commands are restricted to, if any."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const channelID = yield this.client.CommandChannel.Get(msg);
            return msg.reply(this.client.Embed("Command Channel")
                .setDescription(`The current channel set for bot commands is: ${channelID ? (0, Util_1.Channel)(channelID) : "None"}`));
        });
    }
}
exports.default = default_1;
