"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "getautorole";
        super(name, {
            aliases: [name, "currentjoinrole", "currentautorole", "getjoinrole"],
            cooldown: 3e3,
            description: "Returns the role applied to a user when they join."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const roleID = yield this.client.AutoRole.Get(msg);
            return msg.reply(this.client.Embed("Autorole")
                .setDescription(`The current role set for autorole is: ${roleID ? (0, Util_1.Role)(roleID) : "None"}`));
        });
    }
}
exports.default = default_1;
