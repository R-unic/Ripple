"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "addlevels";
        super(name, {
            aliases: [name, "addlvls"],
            cooldown: 20e3,
            ratelimit: 2,
            userPermissions: "ADMINISTRATOR",
            description: {
                content: "Adds an amount of levels to a user's profile.",
                usage: "<levels> <@user?>"
            },
            args: [
                (0, Util_1.Arg)("levels", "number"),
                (0, Util_1.Arg)("user", "member", msg => msg.member)
            ]
        });
    }
    exec(msg, { levels, user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const min = -(this.client.Stats.MaxLevel - 1), max = this.client.Stats.MaxLevel - 1;
            if (levels > max)
                levels = max;
            else if (levels < min)
                levels = min;
            const curLvl = yield this.client.Stats.GetLevel(user);
            if (curLvl + levels > this.client.Stats.MaxLevel || curLvl - levels < -this.client.Stats.MaxLevel) {
                const sub = (curLvl + levels) - 100;
                levels -= sub;
            }
            return this.client.Stats.AddLevel(user, levels)
                .then(() => msg.reply(this.client.Success(`Successfully added \`${(0, Util_1.CommaNumber)(levels)}\` levels to ${user}.`)));
        });
    }
}
exports.default = default_1;
