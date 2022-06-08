"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModLogsChannelManager = void 0;
const tslib_1 = require("tslib");
class ModLogsChannelManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "modlogschannel";
    }
    Get(m) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(m, this.Tag, m.guild.channels.cache.random().id);
        });
    }
    Set(m, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(m, this.Tag, value);
        });
    }
}
exports.ModLogsChannelManager = ModLogsChannelManager;
