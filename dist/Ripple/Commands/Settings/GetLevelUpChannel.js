"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "getlevelupchannel";
        super(name, {
            aliases: [name, "getlevelchannel", "currentlevelchannel", "getlvlchannel", "currentlvlchannel"],
            cooldown: 3e3,
            description: "Returns the channel that level up messages are sent in."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const channelID = yield this.client.LevelUpChannel.Get(msg);
            return msg.reply(this.client.Embed("Level Up Channel")
                .setDescription(`The current channel set for level up messages is: ${channelID ? (0, Util_1.Channel)(channelID) : "None"}`));
        });
    }
}
exports.default = default_1;
