"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "addprestige";
        super(name, {
            aliases: [name, "addprestigelevels", "addprestigelvls", "addacensions"],
            cooldown: 20e3,
            ratelimit: 2,
            userPermissions: "ADMINISTRATOR",
            description: {
                content: "Adds an amount of prestige to a user's profile.",
                usage: "<prestige> <@user?>"
            },
            args: [
                (0, Util_1.Arg)("prestige", "number"),
                (0, Util_1.Arg)("user", "member", msg => msg.member)
            ]
        });
    }
    exec(msg, { prestige, user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const min = -(this.client.Stats.MaxPrestige - 1), max = this.client.Stats.MaxPrestige - 1;
            if (prestige > max)
                prestige = max;
            else if (prestige < min)
                prestige = min;
            const curPrestige = yield this.client.Stats.GetPrestige(user);
            if (curPrestige + prestige > this.client.Stats.MaxPrestige || curPrestige - prestige < -this.client.Stats.MaxPrestige) {
                const sub = (curPrestige + prestige) - 100;
                prestige -= sub;
            }
            return this.client.Stats.AddPrestige(user, prestige)
                .then(() => msg.reply(this.client.Success(`Successfully added \`${(0, Util_1.CommaNumber)(prestige)}\` prestige to ${user}.`)));
        });
    }
}
exports.default = default_1;
