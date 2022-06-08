"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "editsnipe";
        super(name, {
            aliases: [name, "esnipe", "snipeedit", "snipeedited"],
            userPermissions: "MANAGE_MESSAGES",
            cooldown: 3e3,
            ratelimit: 2,
            description: "Returns the latest edited message in the current channel."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const snipe = yield this.client.EditSniper.Get(msg.channel);
            if (!snipe || !snipe.Message || !snipe.SenderID)
                return this.client.Logger.CouldNotBeExecutedError(msg, "There is nothing to snipe.");
            const snipeSender = msg.guild.members.resolve(snipe.SenderID);
            if (!snipeSender)
                return this.client.Logger.CouldNotBeExecutedError(msg, "Sender of sniped message has left.");
            return msg.reply(this.client.Embed("Last Edited Message")
                .setAuthor(snipeSender.user.tag, snipeSender.user.displayAvatarURL({ dynamic: true }))
                .setDescription(snipe.Message));
        });
    }
}
exports.default = default_1;
