"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "purge";
        super(name, {
            aliases: [name, "bulkdel", "bulkdelete", "nuke", "clear", "prune"],
            userPermissions: "MANAGE_MESSAGES",
            clientPermissions: "MANAGE_MESSAGES",
            cooldown: 4e3,
            description: {
                content: "Deletes a number of messages at once.",
                usage: "<numberOfMessages> <@member?>"
            },
            args: [
                (0, Util_1.Arg)("messagesToRemove", "number"),
                (0, Util_1.Arg)("member", "member")
            ]
        });
    }
    exec(msg, { messagesToRemove, member }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield this.client.Purge.Get(msg.member)))
                return this.client.Logger.CouldNotBeExecutedError(msg, "This guild has purging disabled.");
            if (!messagesToRemove)
                return this.client.Logger.MissingArgError(msg, "messagesToRemove");
            const chnl = msg.channel;
            if (!chnl)
                return this.client.Logger.InvalidArgError(msg, "Invalid channel.");
            messagesToRemove++;
            chnl.messages.fetch();
            const messages = chnl.messages.cache.filter(m => member ? m.member === member : true);
            return chnl
                .bulkDelete(messages.array().slice(0, (0, Util_1.Clamp)(messagesToRemove, 1, 100)))
                .then(() => chnl.send(this.client.Success(`Bulk delete successful. Total messages removed: ${messages.size}`)))
                .then(sent => sent.delete({ timeout: this.client.Seconds(2.5) }));
        });
    }
}
exports.default = default_1;
