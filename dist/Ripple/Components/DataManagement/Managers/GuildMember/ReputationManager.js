"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReputationManager = void 0;
const tslib_1 = require("tslib");
class ReputationManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "reputation";
    }
    Get(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(user, this.Tag, 0, user.id);
        });
    }
    Set(user, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(user, this.Tag, value, user.id);
        });
    }
    Increment(user, amount = 1) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Set(user, (yield this.Get(user)) + amount);
        });
    }
}
exports.ReputationManager = ReputationManager;
