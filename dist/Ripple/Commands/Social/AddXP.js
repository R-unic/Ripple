"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "addxp";
        super(name, {
            aliases: [name, "addexp", "addexperience"],
            cooldown: 20e3,
            ratelimit: 2,
            userPermissions: "ADMINISTRATOR",
            description: {
                content: "Adds an amount of experience to a user's profile.",
                usage: "<xp> <@user?>"
            },
            args: [
                (0, Util_1.Arg)("xp", "number"),
                (0, Util_1.Arg)("user", "member", msg => msg.member)
            ]
        });
    }
    exec(msg, { xp, user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const min = 1, max = 10000;
            if (xp > max)
                xp = max;
            else if (xp < min)
                xp = min;
            return this.client.Stats.AddXP(user, xp)
                .then(() => msg.reply(this.client.Success(`Successfully added \`${(0, Util_1.CommaNumber)(xp)}\` XP to ${user}.`)));
        });
    }
}
exports.default = default_1;
