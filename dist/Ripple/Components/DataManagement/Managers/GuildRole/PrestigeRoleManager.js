"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrestigeRoleManager = void 0;
const tslib_1 = require("tslib");
class PrestigeRoleManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "prestigerole";
    }
    Get(role) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(role, this.Tag, undefined, role.id);
        });
    }
    Set(role, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(role, this.Tag, value, role.id);
        });
    }
}
exports.PrestigeRoleManager = PrestigeRoleManager;
