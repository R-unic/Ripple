"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "resetlevels";
        super(name, {
            aliases: [name, "resetlvls", "resetranks", "resetrank", "resetstats"],
            userPermissions: "ADMINISTRATOR",
            cooldown: 20e3,
            ratelimit: 2,
            description: "Resets every users level in the server."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const members = yield msg.guild.members.fetch({ force: true });
            for (const m of members.array())
                yield this.client.Stats.Reset(m);
            return msg.reply(this.client.Success(`Successfully reset all level data.`)).catch(err => this.client.Logger.DatabaseError(msg, err));
        });
    }
}
exports.default = default_1;
