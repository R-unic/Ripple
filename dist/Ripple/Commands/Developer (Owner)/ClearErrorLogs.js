"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "clearerrorlogs";
        super(name, {
            aliases: [name, "clearerrorlog", "clearerrlogs", "clearerrlog", "clearerrs"],
            description: "Clears the collection of errors stored during runtime.",
            ownerOnly: true
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const beforeSize = this.client.Logger.ErrorCount;
            this.client.Logger.Clear();
            return msg.reply(this.client.Success(`Successfully cleared ${beforeSize} error(s) from the internal runtime error log.`));
        });
    }
}
exports.default = default_1;
