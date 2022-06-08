"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "author";
        super(name, {
            aliases: [name, "creator", "maker", "dev", "developer"],
            description: "Returns the author of Ripple."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return msg.reply(this.client.Embed("Author")
                .setDescription(`Ripple was made by ${this.client.ownerID.map(Util_1.User).join(", ")}`));
        });
    }
}
exports.default = default_1;
