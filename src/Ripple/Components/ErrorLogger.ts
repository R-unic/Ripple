import { Collection } from "discord.js";

/**
 * @class Error Logger
 * @description Stores an array of errors that can be manipulated or added to.
*/
export class ErrorLogger {
    public readonly Log = new Collection<Date, Error | string>();

    /**
     * @description Clear the error log
    */
    public ClearLog() {
        this.Log.clear();
    }

    /**
     * @description Report an error message
     * @param errorMsg Content of error message
     * @param createdAt Date the error message was created at
     * @returns Index of error inside of log array
    */
    public Report(errorMsg: string, createdAt: Date): ErrorLogger {
        console.error(errorMsg);
        this.Log.set(createdAt, errorMsg);
        return this;
    }

    /**
     * @description Throw an error then log it
     * @param errorMsg Content of error message
     * @returns Index of error inside of log array
    */
    public Throw(errorMsg: string, createdAt: Date): ErrorLogger {
        const err = new Error(errorMsg);
        this.Log.set(createdAt, err);
        return this;
    }
}
