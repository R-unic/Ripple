"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelUpChannelManager = void 0;
const tslib_1 = require("tslib");
class LevelUpChannelManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "levelupchannel";
    }
    Get(m) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(m, this.Tag, undefined);
        });
    }
    Set(m, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(m, this.Tag, value);
        });
    }
}
exports.LevelUpChannelManager = LevelUpChannelManager;
