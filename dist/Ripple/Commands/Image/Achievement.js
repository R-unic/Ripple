"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "achievement";
        super(name, {
            aliases: [name, "achievementget", "mcachieve", "achieve"],
            description: {
                content: "Returns a fake Minecraft achievement with the text provided.",
                usage: '<"achievement">',
                examples: ['"Go bankrupt"']
            },
            args: [(0, Util_1.Arg)("achievement", "string")]
        });
    }
    exec(msg, { achievement }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!achievement)
                return this.client.Logger.MissingArgError(msg, "achievement");
            if (achievement.length > 21)
                return this.client.Logger.InvalidArgError(msg, "Text may be no longer than 21 characters.");
            return msg.reply(this.client.Embed("Minecraft Achievement")
                .setImage(`https://minecraftskinstealer.com/achievement/1/Achievement%20Get!/${encodeURIComponent(achievement)}`));
        });
    }
}
exports.default = default_1;
