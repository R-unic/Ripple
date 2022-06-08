"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "invite";
        super(name, {
            aliases: [name, "invitelink", "inviteme", "invitebot", "inv", "invme"],
            description: "Returns an invite link for Ripple."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return msg.reply(this.client.Embed("Invite Me! 🔗")
                .setURL(this.client.InviteLink));
        });
    }
}
exports.default = default_1;
