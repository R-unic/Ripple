"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const PremiumCommand_1 = require("../../Components/CommandClasses/PremiumCommand");
const Util_1 = require("../../Util");
class default_1 extends PremiumCommand_1.PremiumCommand {
    constructor() {
        const name = "directmessage";
        super(name, {
            aliases: [name, "directmsg", "privmsg", "pm", "dm"],
            userPermissions: "MANAGE_GUILD",
            cooldown: 10e3,
            description: {
                content: "Sends a DM to a user as Ripple. (PREMIUM ONLY)",
                usage: '<@user> <"content">'
            },
            args: [
                (0, Util_1.Arg)("user", "user"),
                (0, Util_1.Arg)("content", "string")
            ],
        });
    }
    exec(msg, { user, content }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const error = yield this.DoesNotOwnPremium(msg);
            if (error)
                return error;
            if (!user)
                return this.client.Logger.MissingArgError(msg, "user");
            if (user.user.bot)
                return this.client.Logger.InvalidArgError(msg, "User cannot be a bot!");
            if (!content)
                return this.client.Logger.MissingArgError(msg, "content");
            return user.send(content)
                .then(() => {
                msg.reply(this.client.Success()
                    .setDescription(`Successfully sent your DM to ${user}.`));
                msg.delete();
            });
        });
    }
}
exports.default = default_1;
