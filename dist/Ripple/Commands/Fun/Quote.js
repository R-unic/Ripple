"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const APICommand_1 = require("../../Components/CommandClasses/APICommand");
class default_1 extends APICommand_1.APICommand {
    constructor() {
        const name = "quote";
        super(name, {
            aliases: [name, "motivationalquote", "randomquote"],
            description: "Returns a random quote."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.RequestAPI(msg, "http://api.quotable.io/random")
                .then(res => msg.reply(this.client.QuoteEmbed("Random Quote", "📢")
                .SetQuote(res.content, res.author))).catch(err => this.client.Logger.APIError(msg, err));
        });
    }
}
exports.default = default_1;
