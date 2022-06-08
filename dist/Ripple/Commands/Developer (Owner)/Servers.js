"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "servers";
        super(name, {
            aliases: [name, "serverlist", "inservers"],
            description: "Returns every server Ripple is a member of.",
            ownerOnly: true
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return msg.reply(this.client.Embed("Ripple Servers")
                .setDescription(this.client.guilds.cache
                .array()
                .map(s => `**${s.name}** | ${s.id}`)
                .join("\n")));
        });
    }
}
exports.default = default_1;
