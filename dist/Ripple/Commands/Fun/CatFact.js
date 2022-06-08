"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const APICommand_1 = require("../../Components/CommandClasses/APICommand");
class default_1 extends APICommand_1.APICommand {
    constructor() {
        const name = "catfact";
        super(name, {
            aliases: [name, "randomcatfact", "catfacts"],
            description: "Returns a random cat fact."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.RequestAPI(msg, "https://catfact.ninja/fact")
                .then(({ fact }) => msg.reply(this.client.Embed("🐱 Cat Fact 🐱")
                .setDescription(fact))).catch(err => this.client.Logger.APIError(msg, err !== null && err !== void 0 ? err : "Please try again momentarily. This could be an API error."));
        });
    }
}
exports.default = default_1;
