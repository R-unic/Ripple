"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
const TimeQueue_1 = require("../../Components/DataInterfaces/TimeQueue");
const ms_1 = tslib_1.__importDefault(require("ms"));
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "crime";
        super(name, {
            aliases: [name, "commitcrime", "crimepay"],
            ratelimit: 2,
            description: "Earn a random amount of money for committing crimes."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield this.client.Economy.Get(msg.member)))
                return this.client.Logger.CouldNotBeExecutedError(msg, "This guild has economy disabled.");
            const queue = yield this.client.TimeQueue.Find(msg.member, "crime");
            if (typeof queue !== "undefined" && this.client.TimeQueue.Elapsed(msg.member, queue) < queue.Length)
                return this.client.Logger.CouldNotBeExecutedError(msg, "This command can only be used once every hour.");
            const amount = (0, Util_1.RandomInt)(550);
            return this.client.Bank.Increment(msg.member, amount)
                .then(s => {
                if (s) {
                    this.client.TimeQueue.Add(msg.member, new TimeQueue_1.TimeQueue("crime", (0, ms_1.default)("1h")));
                    return msg.reply(this.client.Embed("Crime", "🚨")
                        .setDescription("You committed crimes for a total of $" + (0, Util_1.CommaNumber)(amount) + "."));
                }
            });
        });
    }
}
exports.default = default_1;
