"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const APICommand_1 = require("../../Components/CommandClasses/APICommand");
class default_1 extends APICommand_1.APICommand {
    constructor() {
        const name = "breakingbadquote";
        super(name, {
            aliases: [name, "breakingbad", "bbquote"],
            description: "Returns a random *Breaking Bad* quote."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.RequestAPI(msg, "https://breaking-bad-quotes.herokuapp.com/v1/quotes")
                .then(res => msg.reply(this.client.QuoteEmbed("Breaking Bad Quote")
                .SetQuote(res[0].quote, res[0].author))).catch(err => this.client.Logger.APIError(msg, err));
        });
    }
}
exports.default = default_1;
