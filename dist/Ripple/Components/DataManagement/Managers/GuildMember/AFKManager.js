"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AFKManager = void 0;
const tslib_1 = require("tslib");
class AFKManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "afk";
        this.Default = { AFK: false, Message: undefined };
    }
    Is(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const status = yield this.Get(user);
            return status.AFK;
        });
    }
    Cancel(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Set(user, this.Default);
        });
    }
    Get(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(user, this.Tag, this.Default);
        });
    }
    Set(user, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(user, this.Tag, value);
        });
    }
}
exports.AFKManager = AFKManager;
