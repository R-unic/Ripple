"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLogger = void 0;
const discord_js_1 = require("discord.js");
/**
 * @class Safe Error Logger
 * @description Stores an array of errors that can be manipulated or added to.
*/
class ErrorLogger {
    constructor(...base) {
        /**
         * @public
         * @readonly
         * @description The internal storage unit for each error or error message
        */
        this.Logged = new discord_js_1.Collection();
        base.forEach(logger => this.Logged = this.Logged.concat(logger.Logged));
    }
    /**
     * @public
     * @readonly
     * @description The amount of errors logged
     * @alias this.Log.size
    */
    get ErrorCount() {
        return this.Logged.size;
    }
    /**
     * @description Clear the error log
     * @alias this.Log.clear()
    */
    ClearLog() {
        this.Logged = new discord_js_1.Collection();
    }
    /**
     * @description Report an error message
     * @param errorMsg Content of error message
     * @param createdAt Date the error message was created at
     * @returns Index of error inside of log array
    */
    Report(errorMsg, createdAt) {
        this.Logged.set(createdAt, errorMsg);
        console.warn(errorMsg);
        return this;
    }
    /**
     * @description Throw an error then log it
     * @param errorMsg Content of error message
     * @returns Index of error inside of log array
    */
    Throw(errorMsg, createdAt) {
        const err = new Error(errorMsg);
        this.Logged.set(createdAt, err);
        return err;
    }
}
exports.ErrorLogger = ErrorLogger;
