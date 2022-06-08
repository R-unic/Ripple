"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSniperManager = void 0;
const tslib_1 = require("tslib");
class DeleteSniperManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "deletesniper";
    }
    Get(channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(channel, this.Tag, undefined);
        });
    }
    Set(channel, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(channel, this.Tag, value);
        });
    }
}
exports.DeleteSniperManager = DeleteSniperManager;
