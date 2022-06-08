"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PremiumManager = void 0;
const tslib_1 = require("tslib");
class PremiumManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "premium";
    }
    Has(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Client.GetForUser(user, this.Tag, false);
        });
    }
    Set(user, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Client.SetForUser(user, this.Tag, value);
        });
    }
}
exports.PremiumManager = PremiumManager;
