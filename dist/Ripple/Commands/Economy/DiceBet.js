"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "dicebet";
        super(name, {
            aliases: [name, "diebet", "betdice", "dicegamble"],
            description: {
                content: "Rolls a dice and if you win you get a reward.",
                usage: "<betNumber> <betAmount>"
            },
            args: [
                (0, Util_1.Arg)("betNumber", "integer"),
                (0, Util_1.Arg)("betAmount", "integer")
            ]
        });
    }
    exec(msg, { betNumber, betAmount }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield this.client.Economy.Get(msg.member)))
                return this.client.Logger.CouldNotBeExecutedError(msg, "This guild has economy disabled.");
            if (!betNumber)
                return this.client.Logger.MissingArgError(msg, "betNumber");
            if (betNumber < 1 || betNumber > 6)
                return this.client.Logger.InvalidArgError(msg, "Can only bet on numbers 1-6. Got '" + betNumber + "'.");
            if (!betAmount)
                return this.client.Logger.MissingArgError(msg, "betAmount");
            if ((yield this.client.Bank.TotalMoney(msg.member)) < Math.abs(betAmount))
                return this.client.Logger.InvalidArgError(msg, "You do not have enough cash to place this bet.");
            const roll = Math.ceil(Math.random() * 6);
            if (roll === betNumber)
                yield this.client.Bank.Increment(msg.member, betAmount);
            else
                yield this.client.Cash.Decrement(msg.member, betAmount);
            return msg.reply(this.client.Embed(`You ${roll === betNumber ? "won" : "lost"} the bet!`)
                .setDescription(`🎲: ${roll}\n\nAmount Bet: $${(0, Util_1.CommaNumber)(betAmount)}`));
        });
    }
}
exports.default = default_1;
