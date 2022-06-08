"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
var Request;
(function (Request) {
    function Post(url, headers) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return Fetch(url, headers, "POST", true);
        });
    }
    Request.Post = Post;
    function GetJSON(url, headers) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return Fetch(url, headers, "GET");
        });
    }
    Request.GetJSON = GetJSON;
    function GetText(url, headers) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return Fetch(url, headers, "GET", true);
        });
    }
    Request.GetText = GetText;
    function Fetch(url, headers, httpMethod, text) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield (0, node_fetch_1.default)(url, { headers: headers, method: httpMethod })
                .then(res => text ? res.text() : res.json());
        });
    }
    Request.Fetch = Fetch;
})(Request = exports.Request || (exports.Request = {}));
