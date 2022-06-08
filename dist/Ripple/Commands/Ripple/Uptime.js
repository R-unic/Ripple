"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "uptime";
        super(name, {
            aliases: [name, "ut"],
            description: "Returns the amount time Ripple has been on for.",
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const uptime = new Date(Date.now() - this.client.uptime);
            return msg.channel.send(this.client.Embed("⏲️ Uptime ⏲️")
                .setDescription("Ripple has been online since:")
                .addField("Date", uptime.toLocaleDateString(), true)
                .addField("Time", uptime.toLocaleTimeString(), true));
        });
    }
}
exports.default = default_1;
