"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortcodeAPI = void 0;
const tslib_1 = require("tslib");
const Request_1 = require("../Request");
var ShortcodeAPI;
(function (ShortcodeAPI) {
    function ShortenURL(baseURL) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { ok, result, error } = yield Request_1.Request.GetJSON(`https://api.shrtco.de/v2/shorten?url=${baseURL}`);
            if (!ok)
                return false;
            return result.full_short_link;
        });
    }
    ShortcodeAPI.ShortenURL = ShortenURL;
})(ShortcodeAPI = exports.ShortcodeAPI || (exports.ShortcodeAPI = {}));
