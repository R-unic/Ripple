"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "generateinvite";
        super(name, {
            aliases: [name, "geninvite", "geninv"],
            ownerOnly: true,
            description: {
                content: "Generates an invite for a server ID.",
                usage: "<serverID>"
            },
            args: [
                (0, Util_1.Arg)("serverID", "string"),
            ]
        });
    }
    exec(msg, { serverID }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!serverID)
                return this.client.Logger.MissingArgError(msg, "serverID");
            const s = this.client.guilds.resolve(serverID);
            const inv = (yield s.fetchInvites()).first();
            return msg.reply(this.client.Success("Successfully generated invite URL: " + inv.url));
        });
    }
}
exports.default = default_1;
