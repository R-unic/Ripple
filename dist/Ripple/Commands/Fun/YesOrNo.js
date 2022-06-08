"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "yesorno";
        super(name, {
            aliases: [name, "yesno", "yn"],
            description: "Returns either 'Yes' or 'No'."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const num = Math.floor(Math.random() * 2);
            return msg.reply(this.client.Embed()
                .setTitle("✅ Yes Or No ❌")
                .setDescription(`Your answer: ${num === 1 ? "Yes" : "No"}.`));
        });
    }
}
exports.default = default_1;
