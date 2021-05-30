/**
 * @class Error Logger
 * @description Stores an array of errors that can be manipulated or added to.
*/
export class ErrorLogger {
    public readonly Log: Error[] = [];

    /**
     * @description Clear the error log
    */
    public ClearLog() {
        this.Log.forEach(() => this.Log.pop());
    }

    /**
     * @description Throw & catch an error then log it
     * @param errorMsg
     * @returns Index of error inside of log array
    */
    public Report(errorMsg: string): number {
        try {
            throw new Error(`Error: ${errorMsg}`);
        } catch (err) {
            return this.Log.push(err);
        }
    }
}
