"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "color";
        super(name, {
            aliases: [name, "hexcolor"],
            description: {
                content: "Returns an embed with the color provided, or a random color.",
                usage: '<"color?">'
            },
            args: [(0, Util_1.Arg)("color", "uppercase", "RANDOM")]
        });
    }
    exec(msg, { color }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!color)
                return this.client.Logger.MissingArgError(msg, "color");
            return msg.reply(this.client.Embed((0, Util_1.ToTitleCase)(color.trim()))
                .setColor(color.trim().split(" ").join("_")));
        });
    }
}
exports.default = default_1;
