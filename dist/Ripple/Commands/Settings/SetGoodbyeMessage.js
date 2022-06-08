"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "setgoodbyemessage";
        super(name, {
            aliases: [name, "setgoodbyemsg", "autogoodbye", "autobye", "setbyemsg", "byemsg", "byemessage"],
            userPermissions: "MANAGE_GUILD",
            clientPermissions: "MANAGE_GUILD",
            cooldown: 3e3,
            description: {
                content: "Sets the goodbye message said when a user leaves the server.\nUse {member} for the user joining, and {server} to refer to the server.",
                usage: '<"welcomeMessage"> <channel?>',
                examples: ['"Welcome to {server.name}, {member}! You are the {server.memberCount}th member!"']
            },
            args: [
                (0, Util_1.Arg)("welcomeMessage", "string"),
                (0, Util_1.Arg)("channel", "textChannel", msg => msg.guild.systemChannel)
            ],
        });
    }
    exec(msg, { goodbyeMessage, channel }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.client.WelcomeChannel.Set(msg, channel.id);
            if (!goodbyeMessage) {
                return this.client.GoodbyeMessage.Set(msg, null)
                    .then(() => msg.reply(this.client.Success("Successfully disabled goodbye message."))).catch(err => this.client.Logger.DatabaseError(msg, err));
            }
            return this.client.GoodbyeMessage.Set(msg, goodbyeMessage)
                .then(() => msg.reply(this.client.Success(`Successfully set goodbye message to "${goodbyeMessage}".`))).catch(err => this.client.Logger.DatabaseError(msg, err));
        });
    }
}
exports.default = default_1;
