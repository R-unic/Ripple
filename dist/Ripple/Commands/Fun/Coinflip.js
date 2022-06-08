"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "coinflip";
        super(name, {
            aliases: [name, "flipcoin", "headsortails", "flip"],
            description: "Returns either 'Heads' or 'Tails'."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const num = Math.floor(Math.random() * 2);
            return msg.reply(this.client.Embed("🪙 Coinflip 🪙")
                .setDescription(`I flipped a coin for you, ${msg.member}. It was ${num === 1 ? "Heads" : "Tails"}!`));
        });
    }
}
exports.default = default_1;
