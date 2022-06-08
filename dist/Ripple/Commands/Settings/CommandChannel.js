"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "commandchannel";
        super(name, {
            aliases: [name, "cmdchannel", "cmdchnl", "commandschannel", "cmdschannel", "cmdschnl"],
            userPermissions: "MANAGE_CHANNELS",
            clientPermissions: "MANAGE_CHANNELS",
            cooldown: 5e3,
            ratelimit: 2,
            description: {
                content: "Sets a channel for commands to be enabled in, disabled everywhere else.",
                usage: "<@channel?>"
            },
            args: [(0, Util_1.Arg)("channel", "textChannel")]
        });
    }
    exec(msg, { channel }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!channel)
                return this.client.CommandChannel.Set(msg, null)
                    .then(() => msg.reply(this.client.Success("Successfully unbinded command channel."))).catch(err => this.client.Logger.DatabaseError(msg, err));
            return this.client.CommandChannel.Set(msg, channel.id)
                .then(() => msg.reply(this.client.Success(`Successfully binded command channel to ${channel}.`))).catch(err => this.client.Logger.DatabaseError(msg, err));
        });
    }
}
exports.default = default_1;
