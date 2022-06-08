"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatReviveRoleManager = void 0;
const tslib_1 = require("tslib");
class ChatReviveRoleManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "chatreviverole";
    }
    Get(m) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(m, this.Tag, m.guild.roles.everyone.id);
        });
    }
    Set(m, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(m, this.Tag, value);
        });
    }
}
exports.ChatReviveRoleManager = ChatReviveRoleManager;
