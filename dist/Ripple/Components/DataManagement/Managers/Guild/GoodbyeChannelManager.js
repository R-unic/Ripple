"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodbyeChannelManager = void 0;
const tslib_1 = require("tslib");
class GoodbyeChannelManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "byemsgchannel";
    }
    Get(m) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(m, this.Tag, m.guild.systemChannelID);
        });
    }
    Set(m, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(m, this.Tag, value);
        });
    }
}
exports.GoodbyeChannelManager = GoodbyeChannelManager;
