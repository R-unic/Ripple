"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixManager = void 0;
const tslib_1 = require("tslib");
class PrefixManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "prefix";
    }
    Get(m) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(m, this.Tag, this.Client.DefaultPrefix);
        });
    }
    Set(m, newPrefix) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(m, this.Tag, newPrefix);
        });
    }
}
exports.PrefixManager = PrefixManager;
