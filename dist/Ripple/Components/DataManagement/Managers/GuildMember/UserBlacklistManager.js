"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlacklistManager = void 0;
const tslib_1 = require("tslib");
class UserBlacklistManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "userblacklist";
    }
    Get(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(user, this.Tag, false, user.id);
        });
    }
    Set(user, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(user, this.Tag, value, user.id);
        });
    }
}
exports.UserBlacklistManager = UserBlacklistManager;
