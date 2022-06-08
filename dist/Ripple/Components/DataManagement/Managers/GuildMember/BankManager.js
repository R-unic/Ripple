"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankManager = void 0;
const tslib_1 = require("tslib");
const CurrencyManager_1 = require("../../Base/CurrencyManager");
class BankManager extends CurrencyManager_1.CurrencyManager {
    constructor(Client) {
        super(Client, "bank");
        this.Client = Client;
    }
    Decrement(user, amount) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            amount = Math.abs(amount);
            const extra = (yield this.Get(user)) - amount;
            if (extra < 0) {
                if ((yield this.Client.Cash.Get(user)) < extra)
                    return true; //prolly change
                else {
                    yield this.Increment(user, -amount + extra, true);
                    return yield this.Client.Cash.Increment(user, -extra, true);
                }
            }
            else {
                return yield this.Increment(user, -amount, true);
            }
        });
    }
}
exports.BankManager = BankManager;
