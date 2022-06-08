"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "slots";
        super(name, {
            aliases: [name, "slotsmachine", "slotmachine"],
            description: {
                content: "Rolls some slots and if they align correctly you get a reward.",
                usage: "<bet>"
            },
            args: [(0, Util_1.Arg)("bet", "integer")]
        });
    }
    exec(msg, { bet }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield this.client.Economy.Get(msg.member)))
                return this.client.Logger.CouldNotBeExecutedError(msg, "This guild has economy disabled.");
            if (!bet)
                return this.client.Logger.MissingArgError(msg, "bet");
            if ((yield this.client.Cash.TotalMoney(msg.member)) < Math.abs(bet))
                return this.client.Logger.InvalidArgError(msg, "You do not have enough cash to place this bet.");
            const icons = ["💎", "🍋", "🍉", "❤", "7️⃣", "🔔", "🧲", "🍒", "💵", "💎", "🍋", "🍉", "❤", "7️⃣", "🔔", "🧲", "🍒", "💵"];
            const one = (0, Util_1.RandomElement)(icons), two = (0, Util_1.RandomElement)(icons), three = (0, Util_1.RandomElement)(icons);
            const won = one == two && two == three;
            if (won)
                yield this.client.Bank.Increment(msg.member, Math.abs(bet));
            else
                yield this.client.Cash.Decrement(msg.member, Math.abs(bet));
            return msg.reply(this.client.Embed(`You ${won ? "won" : "lost"} the bet!`)
                .setDescription(`${one} | ${two} | ${three}\n\nAmount Bet: $${(0, Util_1.CommaNumber)(bet)}`));
        });
    }
}
exports.default = default_1;
