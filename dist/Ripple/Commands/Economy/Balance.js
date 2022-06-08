"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "balance";
        super(name, {
            aliases: [name, "bal", "bank", "mybalance", "cash", "mybal"],
            ratelimit: 2,
            description: {
                content: "Returns your cash balance for specific server.",
                usage: "<@member?>"
            },
            args: [(0, Util_1.Arg)("member", "member", msg => msg.member)]
        });
    }
    exec(msg, { member }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield this.client.Economy.Get(msg.member)))
                return this.client.Logger.CouldNotBeExecutedError(msg, "This guild has economy disabled.");
            if (!member)
                return this.client.Logger.MissingArgError(msg, "member");
            if (member.user.bot)
                return this.client.Logger.InvalidArgError(msg, "Bots do not have cash balances.");
            return msg.reply(this.client.Embed(`${member.user.username}'s Balance`)
                .addField("Wallet", "$" + (0, Util_1.CommaNumber)(yield this.client.Cash.Get(member)), true)
                .addField("Bank", "$" + (0, Util_1.CommaNumber)(yield this.client.Bank.Get(member)), true));
        });
    }
}
exports.default = default_1;
