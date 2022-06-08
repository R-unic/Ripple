"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APICommand = void 0;
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
class APICommand extends discord_akairo_1.Command {
    RequestAPI(msg, url, text = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, node_fetch_1.default)(url)
                    .then(res => text ? res.text() : res.json());
            }
            catch (err) {
                this.client.Logger.APIError(msg);
            }
        });
    }
}
exports.APICommand = APICommand;
