"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
const ms_1 = tslib_1.__importDefault(require("ms"));
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "giveaway";
        super(name, {
            aliases: [name, "newgiveaway", "startgiveaway", "ga"],
            userPermissions: "MANAGE_CHANNELS",
            cooldown: 10e3,
            description: {
                content: "Starts a new giveaway.",
                usage: '<"prize"> <time> <winnerAmount?> <channel?>',
                examples: ['"Discord Nitro" 1d 1 #giveaways', '"Spotify Premium Account" 3days']
            },
            args: [
                (0, Util_1.Arg)("prize", "string"),
                (0, Util_1.Arg)("time", "string"),
                (0, Util_1.Arg)("winnerAmount", "number", 1),
                (0, Util_1.Arg)("host", "member", msg => msg.member),
                (0, Util_1.Arg)("channel", "textChannel", msg => msg.channel)
            ]
        });
    }
    exec(msg, { prize, time, winnerAmount, host, channel }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!time)
                return this.client.Logger.MissingArgError(msg, "time");
            if (!prize)
                return this.client.Logger.MissingArgError(msg, "prize");
            return this.client.Giveaways.start(channel, {
                time: (0, ms_1.default)(time),
                winnerCount: winnerAmount,
                prize: prize,
                hostedBy: host.user
            });
        });
    }
}
exports.default = default_1;
