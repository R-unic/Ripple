"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "addmoney";
        super(name, {
            aliases: [name, "addcash"],
            cooldown: 6e3,
            ratelimit: 2,
            userPermissions: "ADMINISTRATOR",
            description: {
                content: "Adds a specified amount of money to a member's balance.",
                usage: '<destination: "bank" | "wallet"> <amount> <@member?>'
            },
            args: [
                (0, Util_1.Arg)("destination", "string"),
                (0, Util_1.Arg)("amount", "integer"),
                (0, Util_1.Arg)("member", "member", m => m.member)
            ]
        });
    }
    exec(msg, { destination, member, amount }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield this.client.Economy.Get(msg.member)))
                return this.client.Logger.CouldNotBeExecutedError(msg, "This guild has economy disabled.");
            if (!member)
                return this.client.Logger.MissingArgError(msg, "member");
            if (member.user.bot)
                return this.client.Logger.InvalidArgError(msg, "Bots do not have balances.");
            if (!destination)
                return this.client.Logger.MissingArgError(msg, "destination");
            if (!amount)
                return this.client.Logger.MissingArgError(msg, "amount");
            if (this.client.VerifySource(destination))
                return this.client.Logger.InvalidArgError(msg, "Destination of funds must be 'bank' or 'wallet'. Got '" + destination + "'.");
            destination = destination.toLowerCase();
            const store = destination === "bank" ? this.client.Bank : this.client.Cash;
            return store.Increment(member, Math.abs(amount))
                .then((success) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (success)
                    msg.reply(this.client.Success(`Successfully added $${(0, Util_1.CommaNumber)(amount)} to ${member}'s ${destination}. ${member} now has $${(0, Util_1.CommaNumber)(yield store.Get(member))}`));
            }));
        });
    }
}
exports.default = default_1;
