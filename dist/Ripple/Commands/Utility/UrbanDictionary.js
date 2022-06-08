"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
const axios_1 = tslib_1.__importDefault(require("axios"));
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "urbandictionary";
        super(name, {
            aliases: [name, "urbandict", "urban"],
            description: {
                content: "Looks up a phrase on Urban Dictionary.",
                usage: '<"phrase"> <resultNumber?>'
            },
            args: [
                (0, Util_1.Arg)("phrase", "string"),
                (0, Util_1.Arg)("resultNumber", "number", 0)
            ]
        });
    }
    exec(msg, { phrase, resultNumber }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!phrase)
                return this.client.Logger.MissingArgError(msg, "phrase");
            if (resultNumber !== 0)
                resultNumber--;
            const base = "http://api.urbandictionary.com/v0/define?term=";
            const url = base + phrase.split(" ").join("+");
            return axios_1.default.get(url)
                .then(res => {
                const result = res.data.list[resultNumber];
                if (result)
                    return this.client.Embed()
                        .setTitle(`"${result.word}"`)
                        .setAuthor(`Author: ${result.author}`)
                        .addField(`Definition (${resultNumber + 1} of ${res.data.list.length})`, result.definition.slice(1, 1020))
                        .addField("Example", result.example.slice(1, 1020))
                        .setURL(result.permalink);
                else
                    return "No entry found.";
            })
                .then(out => msg.reply(out));
        });
    }
}
exports.default = default_1;
