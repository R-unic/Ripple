"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "ping";
        super(name, {
            aliases: [name, "test"],
            description: "Returns 'Pong!'"
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return msg.reply("Ping...")
                .then((sent) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const created = msg.createdTimestamp;
                sent.delete();
                return msg.reply(this.client.Embed()
                    .setTitle("Pong! 🏓")
                    .addField("Latency", `${sent.createdTimestamp - created}ms`)
                    .addField("Discord API Latency", `${Math.round(this.client.ws.ping)}ms`));
            }));
        });
    }
}
exports.default = default_1;
