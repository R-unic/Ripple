"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModLogIDManager = void 0;
const tslib_1 = require("tslib");
class ModLogIDManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "modlogid";
    }
    Get(m) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(m, this.Tag, 1);
        });
    }
    Set(m, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(m, this.Tag, value);
        });
    }
    Increment(m, amount) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Set(m, (yield this.Get(m)) + (amount !== null && amount !== void 0 ? amount : 1));
        });
    }
}
exports.ModLogIDManager = ModLogIDManager;
