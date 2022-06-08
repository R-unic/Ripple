"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "getwelcomemessage";
        super(name, {
            aliases: [name, "currentwelcomemessage", "currentwelcomemsg", "getwelcomemsg", "getautowelcome"],
            userPermissions: "MANAGE_GUILD",
            clientPermissions: "MANAGE_GUILD",
            cooldown: 3e3,
            description: "Returns the welcome message said when a user joins the server.",
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.client.WelcomeMessage.Get(msg, "Welcome message is disabled for this server.")
                .then(welcomeMessage => msg.reply(this.client.Embed(`Welcome Message In \`${msg.guild.name}\``)
                .setDescription(welcomeMessage)));
        });
    }
}
exports.default = default_1;
