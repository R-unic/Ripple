"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListManager = void 0;
const tslib_1 = require("tslib");
class ListManager {
    constructor(Client, Tag, DefaultValue) {
        this.Client = Client;
        this.Tag = Tag;
        this.DefaultValue = DefaultValue;
    }
    Add(m, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const list = yield this.Get(m);
            list.push(value);
            return this.Set(m, list);
        });
    }
    Remove(m, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const list = yield this.Get(m);
            return this.Set(m, list.filter(v => v === value ? undefined : v));
        });
    }
    Get(m) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(m, this.Tag, (_a = this.DefaultValue) !== null && _a !== void 0 ? _a : []);
        });
    }
    Set(m, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(m, this.Tag, value);
        });
    }
}
exports.ListManager = ListManager;
