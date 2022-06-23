"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const tslib_1 = require("tslib");
const ErrorLogger_1 = require("./ErrorLogger");
const Util_1 = require("../Util");
const ms_1 = tslib_1.__importDefault(require("ms"));
const format_duration_1 = tslib_1.__importDefault(require("format-duration"));
class Logger {
    constructor(client) {
        this.client = client;
        this.ErrorLogger = new ErrorLogger_1.ErrorLogger;
    }
    get Collection() {
        return this.ErrorLogger.Logged;
    }
    get ErrorCount() {
        return this.Collection.size;
    }
    /**
     * @description Clear the error log
    */
    Clear() {
        this.ErrorLogger.ClearLog();
    }
    ProfanityError(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Error(msg, `Profanity Error: Your message contained profanity and therefore could not be sent.`);
        });
    }
    JSError(msg, err) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Error(msg, `JS Error: ${err}`);
        });
    }
    NotCommandChannelError(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const cmdChannelID = yield this.client.CommandChannel.Get(msg);
            return this.Error(msg, `Command may not be executed in this channel. Please use ${(0, Util_1.Channel)(cmdChannelID)}.`);
        });
    }
    CooldownError(msg, cmd, remaining) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Error(msg, `\`${cmd.id}\` is on cooldown for another ${(0, format_duration_1.default)(remaining)} seconds! ⏲️`);
        });
    }
    CouldNotBeExecutedError(msg, errorMsg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Error(msg, `Command Could Not Be Executed: ${errorMsg}`);
        });
    }
    LevelSystemError(msg, errorMsg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Error(msg, `Level System Error: ${errorMsg}`);
        });
    }
    UtilError(msg, errorMsg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Error(msg, `Util Error: ${errorMsg !== null && errorMsg !== void 0 ? errorMsg : "There was a problem with an internal utility function."}`);
        });
    }
    NoPremiumError(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Error(msg, `This command is Premium-only! If you would like to purchase Ripple Premium, visit [here](${this.client.DonateLink}). Only a one-time payment of USD$10!`);
        });
    }
    DiscordAPIError(msg, err) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Error(msg, `Discord API Error: ${typeof err === "string" ? err : err.message}`);
        });
    }
    InvalidArgError(msg, errorMsg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Error(msg, `Invalid Argument Error: ${errorMsg}`);
        });
    }
    APIError(msg, errorMsg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Error(msg, `API Error: ${errorMsg !== null && errorMsg !== void 0 ? errorMsg : "Please try again momentarily. This could be an API error."}`);
        });
    }
    DatabaseError(msg, errorMsg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Error(msg, `Database Error: ${errorMsg !== null && errorMsg !== void 0 ? errorMsg : "There was an error with the database."}`);
        });
    }
    MissingArgError(msg, argName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const prefix = yield this.client.Prefix.Get(msg);
            return this.Error(msg, `
        Missing Required Argument Error: "${argName}"
        Command requires argument named "${argName}" which was omitted.
        Try using \`${prefix}help\` or \`${prefix}usage <commandName>\`.
        `);
        });
    }
    Collect(msg, desc) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.ErrorLogger.Report(desc, msg.createdAt);
            return msg.reply(this.client.Embed("Info", "📝")
                .setDescription(desc)
                .setColor("#3492EB")).then(m => m.delete({ timeout: (0, ms_1.default)("11s") }));
        });
    }
    Error(msg, errorMsg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.ErrorLogger.Report(errorMsg, msg.createdAt);
            return msg.reply(this.client.Embed("Error!", "❌")
                .setDescription(errorMsg)
                .setColor("#D9210D")).then(m => m.delete({ timeout: (0, ms_1.default)("11s") }));
        });
    }
}
exports.Logger = Logger;
