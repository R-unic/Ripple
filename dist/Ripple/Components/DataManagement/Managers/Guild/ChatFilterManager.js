"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatFilterManager = void 0;
const tslib_1 = require("tslib");
const ListManager_1 = require("../../Base/ListManager");
const bad_words_1 = tslib_1.__importDefault(require("bad-words"));
class ChatFilterManager extends ListManager_1.ListManager {
    constructor(Client) {
        super(Client, "chatfilter", []);
        this.Client = Client;
    }
    IsProfane(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const filter = new bad_words_1.default({ emptyList: true });
            filter.addWords(...yield this.Get(msg));
            return filter.isProfane(msg.content);
        });
    }
}
exports.ChatFilterManager = ChatFilterManager;
