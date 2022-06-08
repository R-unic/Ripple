"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const TimeQueue_1 = require("../../Components/DataInterfaces/TimeQueue");
const ms_1 = tslib_1.__importDefault(require("ms"));
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "hourly";
        super(name, {
            aliases: [name, "hourlies", "claimhourly"],
            ratelimit: 2,
            description: "Claim your hourly cash."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield this.client.Economy.Get(msg.member)))
                return this.client.Logger.CouldNotBeExecutedError(msg, "This guild has economy disabled.");
            const qTag = "hourly";
            const queue = yield this.client.TimeQueue.Find(msg.member, qTag);
            if (typeof queue !== "undefined" && this.client.TimeQueue.Elapsed(msg.member, queue) < queue.Length)
                return this.client.Logger.CouldNotBeExecutedError(msg, "Hourly rewards can only be claimed once every hour.");
            const amount = 400;
            return this.client.Bank.Increment(msg.member, amount)
                .then(s => {
                if (s) {
                    this.client.TimeQueue.Add(msg.member, new TimeQueue_1.TimeQueue(qTag, (0, ms_1.default)("1h")));
                    return msg.reply(this.client.Success("Successfully claimed hourly reward for $" + amount));
                }
            });
        });
    }
}
exports.default = default_1;
