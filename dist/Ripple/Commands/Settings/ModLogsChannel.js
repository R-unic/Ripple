"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "modlogschannel";
        super(name, {
            aliases: [name, "modlogchannel", "modloggingchannel", "moderatorlogschannel", "moderatorlogchannel", "modlogschnl", "modlogchnl"],
            userPermissions: "MANAGE_CHANNELS",
            clientPermissions: "MANAGE_CHANNELS",
            cooldown: 5e3,
            ratelimit: 2,
            description: {
                content: "Sets a channel for moderator logging messages to manifest in.",
                usage: "<@channel?>"
            },
            args: [(0, Util_1.Arg)("channel", "textChannel")]
        });
    }
    exec(msg, { channel }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!channel)
                return this.client.ModLogsChannel.Set(msg, null)
                    .then(() => msg.reply(this.client.Success("Successfully unbinded mod logging channel.")));
            return this.client.ModLogsChannel.Set(msg, channel.id)
                .then(() => msg.reply(this.client.Success(`Successfully set moderator logging channel to ${channel}.`))).catch(err => this.client.Logger.DatabaseError(msg, err));
        });
    }
}
exports.default = default_1;
