import { Collection } from "discord.js";

/**
 * @class Safe Error Logger
 * @description Stores an array of errors that can be manipulated or added to.
*/
export class ErrorLogger {
    /**
     * @public
     * @readonly
     * @description The internal storage unit for each error or error message
    */
    public Logged = new Collection<Date, string | Error>();

    public constructor(...base: ErrorLogger[]) {
        base.forEach(logger => 
            this.Logged = this.Logged.concat(logger.Logged));
    }

    /**
     * @public
     * @readonly
     * @description The amount of errors logged
     * @alias this.Log.size
    */
    public get ErrorCount() {
        return this.Logged.size
    }

    /**
     * @description Clear the error log
     * @alias this.Log.clear()
    */
    public ClearLog() {
        this.Logged = new Collection<Date, string | Error>();
    }

    /**
     * @description Report an error message
     * @param errorMsg Content of error message
     * @param createdAt Date the error message was created at
     * @returns Index of error inside of log array
    */
    public Report(errorMsg: string, createdAt: Date): ErrorLogger {
        this.Logged.set(createdAt, errorMsg);
        console.warn(errorMsg);
        return this;
    }

    /**
     * @description Throw an error then log it
     * @param errorMsg Content of error message
     * @returns Index of error inside of log array
    */
    public Throw(errorMsg: string, createdAt: Date): Error {
        const err = new Error(errorMsg);
        this.Logged.set(createdAt, err);
        return err;
    }
}
