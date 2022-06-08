"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "filteredwords";
        super(name, {
            aliases: [name, "blacklistedwords", "wordsfiltered", "filtered"],
            ratelimit: 2,
            description: "Returns a list of all filtered words in this guild."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield this.client.Filtering.Get(msg)))
                return this.client.Logger.CouldNotBeExecutedError(msg, "Chat filtering is disabled for this guild.");
            const filtered = yield this.client.Filter.Get(msg);
            return msg.reply(this.client.Embed("Filtered Words", "🚫", filtered.length === 0 ? "None" : filtered.join(", ")));
        });
    }
}
exports.default = default_1;
