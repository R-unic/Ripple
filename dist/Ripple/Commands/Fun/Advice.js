"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const APICommand_1 = require("../../Components/CommandClasses/APICommand");
const Util_1 = require("../../Util");
class default_1 extends APICommand_1.APICommand {
    constructor() {
        const name = "advice";
        super(name, {
            aliases: [name, "giveadvice", "adviceslip"],
            description: {
                content: "Returns a an advice slip based on a problem, or a random advice slip.",
                usage: '<"problem?">'
            },
            args: [(0, Util_1.Arg)("problem", "string")]
        });
    }
    exec(msg, { problem }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const baseURL = "https://api.adviceslip.com/";
            const embed = this.client.Embed("❔ Advice ❔");
            return (problem ?
                this.RequestAPI(msg, baseURL + `advice/search/${encodeURIComponent(problem)}`)
                    .then(({ slips, message }) => { var _a; return embed.setDescription((_a = message === null || message === void 0 ? void 0 : message.text) !== null && _a !== void 0 ? _a : slips[0].advice); })
                : this.RequestAPI(msg, baseURL + "advice")
                    .then(({ slip, message }) => { var _a; return embed.setDescription((_a = message === null || message === void 0 ? void 0 : message.text) !== null && _a !== void 0 ? _a : slip.advice); })).then(embed => msg.reply(embed))
                .catch(err => this.client.Logger.APIError(msg, err));
        });
    }
}
exports.default = default_1;
