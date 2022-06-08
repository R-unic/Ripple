"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const ErrorLogger_1 = require("../../Components/ErrorLogger");
const Events_1 = require("../../Events");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "errorlogs";
        super(name, {
            aliases: [name, "geterrorlogs", "errorlog", "errlogs", "errlog", "elogs", "elog"],
            description: "Returns a list of every error logged during current runtime.",
            ownerOnly: true
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const logger = new ErrorLogger_1.ErrorLogger(this.client.Logger.ErrorLogger, Events_1.EventErrorLogger);
            let log = "";
            logger.Logged
                .forEach((err, date) => log +=
                `(${typeof err === "string" ? err : err.message}) - (${date.toLocaleDateString()} | ${date.toLocaleTimeString()})\n`);
            return msg.reply(this.client.Embed("Error Logs")
                .setDescription(log === "" ? "Nothing logged yet." : log.slice(0, 1023)));
        });
    }
}
exports.default = default_1;
