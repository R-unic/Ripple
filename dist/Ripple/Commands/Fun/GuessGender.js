"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const APICommand_1 = require("../../Components/CommandClasses/APICommand");
const Util_1 = require("../../Util");
class default_1 extends APICommand_1.APICommand {
    constructor() {
        const name = "guessgender";
        super(name, {
            aliases: [name, "genderize", "namegender"],
            description: {
                content: "Guesses your gender based on your name.",
                usage: '<"name">'
            },
            args: [(0, Util_1.Arg)("name", "string")]
        });
    }
    exec(msg, { name }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!name)
                return this.client.Logger.MissingArgError(msg, "name");
            return this.RequestAPI(msg, "https://api.genderize.io?name=" + encodeURIComponent(name))
                .then(({ name, gender, probability }) => msg.reply(this.client.Embed()
                .setAuthor(`Certainty: ${probability * 100}%`)
                .setTitle(`♂️ ${(0, Util_1.ToTitleCase)(name)} ♀️`)
                .setDescription(gender ? (0, Util_1.ToTitleCase)(gender) : "Could not guess gender."))).catch(err => this.client.Logger.APIError(msg, err));
        });
    }
}
exports.default = default_1;
