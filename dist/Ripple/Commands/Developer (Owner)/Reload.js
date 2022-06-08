"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "reload";
        super(name, {
            aliases: [name, "reloadbot", "restart", "restartbot", "rl", "rs"],
            description: "Reloads Ripple's commands.",
            ownerOnly: true
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const category of this.client.CommandHandler.categories)
                for (const [_, cmd] of category[1])
                    cmd.reload();
            return msg.reply(this.client.Success("Successfully reloaded all of Ripple's commands.")).catch(e => { var _a; return this.client.Logger.APIError(msg, (_a = e === null || e === void 0 ? void 0 : e.message) !== null && _a !== void 0 ? _a : e); });
        });
    }
}
exports.default = default_1;
