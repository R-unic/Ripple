"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const APICommand_1 = require("../../Components/CommandClasses/APICommand");
class default_1 extends APICommand_1.APICommand {
    constructor() {
        const name = "chucknorris";
        super(name, {
            aliases: [name, "chucknorrisjoke", "norrisjoke", "norris"],
            description: "Returns a random Chuck Norris themed joke."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.RequestAPI(msg, "https://api.chucknorris.io/jokes/random")
                .then(({ icon_url, value }) => msg.reply(this.client.Embed()
                .setTitle("😂 Chuck Norris Joke 😂")
                .setThumbnail(icon_url)
                .setDescription(value))).catch(err => this.client.Logger.APIError(msg, err));
        });
    }
}
exports.default = default_1;
