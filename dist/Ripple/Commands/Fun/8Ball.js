"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "8ball";
        super(name, {
            aliases: [name, "eightball", "magic8", "fortune"],
            description: {
                content: "Consults the magic eight ball for a trustworthy answer.",
                usage: '<"question"?>'
            }
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const answers = [
                "It is certain.",
                "It is decidedly so.",
                "Without a doubt.",
                "Yes - definitely.",
                "You may rely on it.",
                "As I see it, yes.",
                "Most likely.",
                "Outlook good.",
                "Yes.",
                "Signs point to yes.",
                "Reply hazy, try again.",
                "Ask again later.",
                "Better not tell you now.",
                "Cannot predict now.",
                "Concentrate and ask again.",
                "Don't count on it.",
                "My reply is no.",
                "My sources say no.",
                "Outlook not so good.",
                "Very doubtful."
            ];
            return msg.channel.send(this.client.Embed()
                .setTitle("🎱 Magic 8-Ball 🎱")
                .setDescription((0, Util_1.RandomElement)(answers)));
        });
    }
}
exports.default = default_1;
