"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "numberfact";
        super(name, {
            aliases: [name, "randomnumberfact"],
            description: "Returns a random number fact."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.RequestAPI()
                .then(fact => {
                return msg.reply(this.client.Embed("Random Number Fact")
                    .setDescription(fact));
            }).catch(() => this.client.Logger.APIError(msg, "Please try again momentarily. This could be an API error."));
        });
    }
    RequestAPI() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, node_fetch_1.default)("http://numbersapi.com/random/math")
                .then(response => response.text());
        });
    }
}
exports.default = default_1;
