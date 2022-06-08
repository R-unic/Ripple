"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "reputation";
        super(name, {
            aliases: [name, "rep", "addrep", "giverep"],
            cooldown: 3600e3,
            ratelimit: 2,
            description: {
                content: "Adds a reputation point to the given user.",
                usage: "<@member>"
            },
            args: [(0, Util_1.Arg)("user", "member")]
        });
    }
    exec(msg, { user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (user === msg.member)
                return this.client.Logger.InvalidArgError(msg, "You cannot give a reputation point to yourself.");
            if (user.user.bot)
                return this.client.Logger.InvalidArgError(msg, "You cannot give a reputation point to a bot.");
            return this.client.Reputation.Increment(user)
                .then(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                return msg.reply(this.client.Success()
                    .setDescription(`Successfully added a reputation point to ${user}. They now have ${yield this.client.Reputation.Get(user)} reputation.`));
            }));
        });
    }
}
exports.default = default_1;
