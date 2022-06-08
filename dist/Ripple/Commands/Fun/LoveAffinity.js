"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "loveaffinity";
        super(name, {
            aliases: [name, "love", "affinity"],
            description: {
                content: "Returns the love affinity between you and another user, or a random user.",
                usage: "<@user?>"
            },
            args: [(0, Util_1.Arg)("member", "member", Util_1.RandomUser)]
        });
    }
    exec(msg, { member }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const affinity = Math.round(Math.random() * 100);
            return msg.reply(this.client.Embed("Love Affinity", "💖")
                .setDescription(`${msg.member} is a ${affinity}% match for ${member}`)
                .setColor("#FF00E1"));
        });
    }
}
exports.default = default_1;
