"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
const PremiumCommand_1 = require("../../Components/CommandClasses/PremiumCommand");
const format_duration_1 = tslib_1.__importDefault(require("format-duration"));
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "commandusage";
        super(name, {
            aliases: [name, "cmdusage", "commandinfo", "cmdinfo", "usage"],
            description: {
                content: "Returns an embed containing all necessary information to use a command.",
                usage: "<commandName>"
            },
            args: [(0, Util_1.Arg)("command", "commandAlias")]
        });
    }
    exec(msg, { command }) {
        var _a, _b, _c, _d;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!command)
                return this.client.Logger.MissingArgError(msg, "command");
            const prefix = yield this.client.Prefix.Get(msg);
            const descIsString = typeof command.description === "string";
            let userPerms;
            let clientPerms;
            if (command.userPermissions instanceof Array)
                userPerms = command.userPermissions.map(p => (0, Util_1.ToTitleCase)(p.toString())).join(", ");
            else
                userPerms = command.userPermissions;
            if (command.clientPermissions instanceof Array)
                clientPerms = command.clientPermissions.map(p => (0, Util_1.ToTitleCase)(p.toString())).join(", ");
            else
                clientPerms = command.clientPermissions;
            return msg.reply(this.client.Embed(`How To Use \`${prefix}${command.aliases[0]}\``)
                .setDescription(descIsString ? command.description : command.description.content)
                .addField("Arguments", descIsString ? "None" : command.description.usage, true)
                .addField("Cooldown", command.cooldown ? (0, format_duration_1.default)(command.cooldown) : "None", true)
                .addField("Aliases", command.aliases.slice(1, -1).map(a => `\`${a}\``).join(", "), true)
                .addField("Examples", (_d = (_c = (_b = (_a = command.description) === null || _a === void 0 ? void 0 : _a.examples) === null || _b === void 0 ? void 0 : _b.map(a => `\`${a}\``)) === null || _c === void 0 ? void 0 : _c.join(", ")) !== null && _d !== void 0 ? _d : "None", true)
                .addField("Owner Only", command.ownerOnly ? "Yes" : "No", true)
                .addField("Premium Only", command instanceof PremiumCommand_1.PremiumCommand ? "Yes" : "No", true)
                .addField("Required User Permissions", userPerms ?
                `\`${userPerms}\``
                : "None", true)
                .addField("Required Bot Permissions", clientPerms ?
                `\`${clientPerms}\``
                : "None", true));
        });
    }
}
exports.default = default_1;
