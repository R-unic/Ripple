"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const APICommand_1 = require("../../Components/CommandClasses/APICommand");
class default_1 extends APICommand_1.APICommand {
    constructor() {
        const name = "moviequote";
        super(name, {
            aliases: [name, "randommoviequote"],
            description: "Returns a random quote from a random movie."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.RequestAPI(msg, "https://movie-quote-api.herokuapp.com/v1/quote/")
                .then(({ quote, role, show }) => msg.reply(this.client.QuoteEmbed(`Quote From \`${show}\``)
                .SetQuote(quote, role))).catch(err => this.client.Logger.APIError(msg, err));
        });
    }
}
exports.default = default_1;
