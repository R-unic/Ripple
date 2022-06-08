"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "unfilterword";
        super(name, {
            aliases: [name, "unblacklistword", "whitelistword", "wordunfilter"],
            userPermissions: "MANAGE_MESSAGES",
            cooldown: 1e3,
            ratelimit: 2,
            description: {
                content: "Removes the specified word from the text filter.",
                usage: '<"word">'
            },
            args: [(0, Util_1.Arg)("word", "string")]
        });
    }
    exec(msg, { word }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!word)
                return this.client.Logger.MissingArgError(msg, "word");
            if (!(yield this.client.Filtering.Get(msg)))
                return this.client.Logger.CouldNotBeExecutedError(msg, "Chat filtering is disabled for this guild.");
            return this.client.Filter.Remove(msg, word)
                .then(() => msg.reply(this.client.Success(`Successfully removed "${word}" from the filter.`)));
        });
    }
}
exports.default = default_1;
