"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "wikipedia";
        super(name, {
            aliases: [name, "wiki"],
            description: {
                content: "Returns a Wikipedia article for the given query.",
                usage: '<"query">',
                examples: ['"sugar gliders"']
            },
            args: [(0, Util_1.Arg)("query", "string")]
        });
    }
    exec(msg, { query }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!query)
                return this.client.Logger.MissingArgError(msg, "query");
            return this.RequestAPI(query).then(res => {
                var _a, _b, _c, _d;
                return res ? msg.reply(this.client.Embed()
                    .setTitle(res.titles.display)
                    .setAuthor((0, Util_1.StripISO)(res.timestamp))
                    .setURL(res.content_urls.desktop.page)
                    .setThumbnail((_d = (_b = (_a = res.thumbnail) === null || _a === void 0 ? void 0 : _a.source) !== null && _b !== void 0 ? _b : (_c = res.originalimage) === null || _c === void 0 ? void 0 : _c.source) !== null && _d !== void 0 ? _d : res.content_urls.desktop.page)
                    .setDescription(res.extract)) : this.APIError(msg, "No results found.");
            }).catch(err => this.APIError(msg, err));
        });
    }
    APIError(msg, err) {
        return this.client.Logger.APIError(msg, err !== null && err !== void 0 ? err : "Please try again momentarily. This could be an API error.");
    }
    RequestAPI(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, node_fetch_1.default)(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
                .then(response => response.json());
        });
    }
}
exports.default = default_1;
