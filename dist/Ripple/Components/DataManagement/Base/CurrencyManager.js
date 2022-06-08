"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyManager = void 0;
const tslib_1 = require("tslib");
const Util_1 = require("../../../Util");
class CurrencyManager {
    constructor(Client, Tag) {
        this.Client = Client;
        this.Tag = Tag;
    }
    TotalMoney(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield this.Client.Cash.Get(user)) + (yield this.Client.Bank.Get(user));
        });
    }
    Get(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(user, this.Tag, 0, user.id);
        });
    }
    Set(user, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(user, this.Tag, (0, Util_1.Clamp)(value), user.id);
        });
    }
    Increment(user, amount, sub) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            amount = sub ? -Math.abs(amount) : Math.abs(amount);
            return this.Set(user, (yield this.Get(user)) + amount);
        });
    }
}
exports.CurrencyManager = CurrencyManager;
