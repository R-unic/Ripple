"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
const ms_1 = tslib_1.__importDefault(require("ms"));
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "loopcommand";
        super(name, {
            aliases: [name, "commandloop", "periodcommand"],
            ownerOnly: true,
            description: {
                content: "Loops a command for a given time period.",
                usage: '<command> <period> <"argsJSON">',
                examples: ['randomgif 1h', 'errlogs 1day', `say 7s "{ 'message': 'hello, world!' }"`]
            },
            args: [
                (0, Util_1.Arg)("command", "commandAlias"),
                (0, Util_1.Arg)("period", "string"),
                (0, Util_1.Arg)("argsJSON", "string")
            ]
        });
    }
    exec(msg, { command, period, argsJSON }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let json;
            try {
                json = argsJSON ?
                    JSON.parse(argsJSON
                        .split("'").join('"')) : true;
            }
            catch (err) {
                return this.client.Logger.InvalidArgError(msg, "'argsJSON' could not be resolved to a JSON object.");
            }
            if (!command)
                return this.client.Logger.MissingArgError(msg, "command");
            if (!period)
                return this.client.Logger.MissingArgError(msg, "period");
            this.client.CancelCommandLoop = false;
            const periodMS = (0, ms_1.default)(period);
            if (!periodMS)
                return this.client.Logger.InvalidArgError(msg, "Argument 'period' provided is not an amount of time.");
            const Execute = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (this.client.CancelCommandLoop)
                    return;
                const p = yield command.exec(msg, json === true ? undefined : json);
                setTimeout(Execute, periodMS);
                return p;
            });
            return msg.reply(this.client.Success(`Successfully set loop on \`${command.id}\` for ${period}`)).then(Execute);
        });
    }
}
exports.default = default_1;
