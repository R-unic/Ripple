"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "howgay";
        super(name, {
            aliases: [name, "gaymeter", "gayometer", "gaydar", "gay"],
            description: {
                content: "Returns how gay another user or a random user is.",
                usage: "<@user?>"
            },
            args: [(0, Util_1.Arg)("member", "user", Util_1.RandomUser)]
        });
    }
    exec(msg, { member }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const gayness = (0, Util_1.RandomInt)(100);
            return msg.reply(this.client.Embed("Gaydar", "🏳️‍🌈")
                .setDescription(`${member} is ${gayness}% gay. 🏳️‍🌈`));
        });
    }
}
exports.default = default_1;
