"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "changestat";
        super(name, {
            aliases: [name, "changestatistic", "editstat"],
            ownerOnly: true,
            description: {
                content: "Changes a user's or your own's stat provided.",
                usage: "<stat: 'Level' | 'XP' | 'Prestige'> <value> <@user?>"
            },
            args: [
                (0, Util_1.Arg)("stat", "lowercase"),
                (0, Util_1.Arg)("value", "number"),
                (0, Util_1.Arg)("user", "member", msg => msg.member)
            ]
        });
    }
    exec(msg, { stat, value, user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!stat)
                return this.client.Logger.MissingArgError(msg, "stat");
            if (!value)
                return this.client.Logger.MissingArgError(msg, "value");
            switch (stat) {
                case "prestige": yield this.client.Stats.SetPrestige(user, value);
                case "level": yield this.client.Stats.SetLevel(user, value);
                case "xp": yield this.client.Stats.SetXP(user, value);
            }
            return msg.reply(this.client.Success(`Successfully changed \`${stat}\` to \`${value}\` for ${user}.`));
        });
    }
}
exports.default = default_1;
