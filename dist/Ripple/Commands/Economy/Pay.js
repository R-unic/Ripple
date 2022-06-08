"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "pay";
        super(name, {
            aliases: [name, "givecash", "givemoney"],
            cooldown: 4e3,
            ratelimit: 2,
            description: {
                content: "Pays a specified amount of cash to a member.",
                usage: '<source: "bank" | "wallet"> <@member> <amount>'
            },
            args: [
                (0, Util_1.Arg)("source", "string"),
                (0, Util_1.Arg)("member", "member"),
                (0, Util_1.Arg)("amount", "integer")
            ]
        });
    }
    exec(msg, { source, member, amount }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield this.client.Economy.Get(msg.member)))
                return this.client.Logger.CouldNotBeExecutedError(msg, "This guild has economy disabled.");
            if (!member)
                return this.client.Logger.MissingArgError(msg, "member");
            if (!amount)
                return this.client.Logger.MissingArgError(msg, "amount");
            if (member === msg.member)
                return this.client.Logger.InvalidArgError(msg, "You cannot pay yourself.");
            if (this.client.VerifySource(source))
                return this.client.Logger.InvalidArgError(msg, "Source of funds must be 'bank' or 'wallet'. Got '" + source + "'.");
            if (amount > (yield this.client.Cash.TotalMoney(msg.member)))
                return this.client.Logger.InvalidArgError(msg, "The cash amount specified exceeds your balance.");
            source = source.toLowerCase();
            return this.client.Cash.Increment(member, amount)
                .then(() => (source === "bank" ? this.client.Bank : this.client.Cash).Decrement(msg.member, amount)
                .then((success) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (success)
                    msg.reply(this.client.Success(`Successfully paid $${(0, Util_1.CommaNumber)(amount)} to ${member} from your ${source}'s balance.`));
            })));
        });
    }
}
exports.default = default_1;
