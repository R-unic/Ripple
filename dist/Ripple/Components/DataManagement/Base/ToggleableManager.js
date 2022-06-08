"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleableManager = void 0;
const tslib_1 = require("tslib");
class ToggleableManager {
    constructor(Client, Tag, DefaultValue) {
        this.Client = Client;
        this.Tag = Tag;
        this.DefaultValue = DefaultValue;
    }
    Toggle(m) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const value = yield this.Get(m);
            yield this.Set(m, !value);
            return !value;
        });
    }
    Get(m) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(m, this.Tag, this.DefaultValue);
        });
    }
    Set(m, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(m, this.Tag, value);
        });
    }
}
exports.ToggleableManager = ToggleableManager;
