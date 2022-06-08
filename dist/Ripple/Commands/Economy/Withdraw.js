"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "withdraw";
        super(name, {
            aliases: [name, "wd"],
            ratelimit: 2,
            description: {
                content: "Transfers specified amount of funds into wallet from bank account.",
                usage: '<amount>'
            },
            args: [(0, Util_1.Arg)("amount", "integer")]
        });
    }
    exec(msg, { amount }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield this.client.Economy.Get(msg.member)))
                return this.client.Logger.CouldNotBeExecutedError(msg, "This guild has economy disabled.");
            if (!amount)
                return this.client.Logger.MissingArgError(msg, "amount");
            if (amount > (yield this.client.Bank.Get(msg.member)))
                return this.client.Logger.InvalidArgError(msg, "The amount specified exceeds your bank account's balance.");
            return this.client.Bank.Decrement(msg.member, amount)
                .then(() => this.client.Cash.Increment(msg.member, amount)
                .then((success) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (success)
                    msg.reply(this.client.Success(`Successfully withdrew $${(0, Util_1.CommaNumber)(amount)} from your bank account.`));
            })));
        });
    }
}
exports.default = default_1;
