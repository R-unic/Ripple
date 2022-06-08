"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagManager = void 0;
const tslib_1 = require("tslib");
const ListManager_1 = require("../../Base/ListManager");
class TagManager extends ListManager_1.ListManager {
    constructor(Client) {
        super(Client, "tags", []);
        this.Client = Client;
    }
    Find(m, tagName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tags = yield this.Get(m);
            const tag = tags.find(tag => tag.Name === tagName);
            return tag;
        });
    }
}
exports.TagManager = TagManager;
