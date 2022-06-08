"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "tags";
        super(name, {
            aliases: [name, "guildtags", "servertags"],
            description: "Returns all tags in the guild executed in."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tags = yield this.client.Tags.Get(msg);
            return msg.reply(this.client.Embed(`\`${msg.guild.name}\`'s Tags`)
                .setDescription(tags
                .map(t => `\`${t.Name}\``)
                .join(",\n")
                .slice(0, 1022)));
        });
    }
}
exports.default = default_1;
