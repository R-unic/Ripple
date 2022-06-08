"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeChannelManager = void 0;
const tslib_1 = require("tslib");
class WelcomeChannelManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "welcomemsgchannel";
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
exports.WelcomeChannelManager = WelcomeChannelManager;
