"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "setprefix";
        super(name, {
            aliases: [name, "setserverprefix", "serverprefix", "prefix"],
            userPermissions: "MANAGE_GUILD",
            clientPermissions: "MANAGE_GUILD",
            cooldown: 3e3,
            description: {
                content: "Sets the bot prefix for the server executed in.",
                usage: "<newPrefix?>"
            },
            args: [(0, Util_1.Arg)("prefix", "string")],
        });
    }
    exec(msg, { prefix }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.client.Prefix.Set(msg, prefix);
            return msg.reply(this.client.Success()
                .setDescription(prefix ? `Successfully set prefix to \`${prefix}\`.` : `Successfully reset prefix.`));
        });
    }
}
exports.default = default_1;
