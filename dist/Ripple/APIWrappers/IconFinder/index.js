"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconFinderAPI = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
class IconFinderAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = "https://api.iconfinder.com/v4/";
        this.requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${this.apiKey}`
            }
        };
    }
    QueryIcons(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, node_fetch_1.default)(`${this.baseURL}icons/search?query=${encodeURIComponent(query)}&count=10`, this.requestOptions)
                .then(res => res.json());
        });
    }
}
exports.IconFinderAPI = IconFinderAPI;
