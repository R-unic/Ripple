"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "dick";
        super(name, {
            aliases: [name, "cock", "penis", "pp", "chode", "weiner", "dicksize", "ppsize"],
            description: "Returns a random-sized cock (not real)."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const cockSize = (0, Util_1.RandomInt)(18);
            const balls = "8";
            const shaft = "=".repeat(cockSize);
            const head = "D";
            const cock = balls + shaft + head;
            return msg.reply(this.client.Embed("Dick")
                .setAuthor(`${cockSize} inch(es)`)
                .setDescription(cock));
        });
    }
}
exports.default = default_1;
