"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "diceroll";
        super(name, {
            aliases: [name, "rolldice", "rolldie", "dice"],
            description: "Returns a random number 1-6."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const diceNumber = Math.round(Math.random() * 6);
            return msg.reply(this.client.Embed("🎲 Dice Roll 🎲")
                .setDescription(`I rolled a dice for you, ${msg.member}. It landed on ${diceNumber}!`));
        });
    }
}
exports.default = default_1;
