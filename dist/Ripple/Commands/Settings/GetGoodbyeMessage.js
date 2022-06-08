"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "getgoodbyemessage";
        super(name, {
            aliases: [name, "goodbyemessage", "goodbyemsg", "getgoodbyemsg", "goodbye"],
            userPermissions: "MANAGE_GUILD",
            clientPermissions: "MANAGE_GUILD",
            cooldown: 3e3,
            description: "Returns the goodbye message said when a user leaves the server.",
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.client.GoodbyeMessage.Get(msg, "Goodbye message is disabled for this server.")
                .then(byeMsg => msg.reply(this.client.Embed(`Goodbye Message In \`${msg.guild.name}\``)
                .setDescription(byeMsg)));
        });
    }
}
exports.default = default_1;
