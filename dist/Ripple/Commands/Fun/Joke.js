"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const APICommand_1 = require("../../Components/CommandClasses/APICommand");
class default_1 extends APICommand_1.APICommand {
    constructor() {
        const name = "joke";
        super(name, {
            aliases: [name, "randomjoke"],
            description: "Returns a random joke."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.RequestAPI(msg, "https://v2.jokeapi.dev/joke/Any?blacklistFlags=political,racist,sexist&type=single")
                .then(({ category, joke, didError }) => {
                if (didError)
                    this.client.Logger.APIError(msg);
                return msg.reply(this.client.Embed("😂 Random Joke 😂")
                    .setAuthor(category)
                    .setDescription(joke));
            });
        });
    }
}
exports.default = default_1;
