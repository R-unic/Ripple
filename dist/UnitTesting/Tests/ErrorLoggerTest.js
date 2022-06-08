"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Assert_1 = require("../API/Assert");
const ErrorLogger_1 = require("../../Ripple/Components/ErrorLogger");
class ErrorLoggerTest {
    constructor() {
        this.TestLogger = new ErrorLogger_1.ErrorLogger;
    }
    Run() {
        Assert_1.Assert.Defined(this.TestLogger, undefined, "Test Logger does not exist.");
        Assert_1.Assert.Defined(this.TestLogger.Logged, undefined, "Test Logger does not have a 'Log' property.");
        Assert_1.Assert.Equals(this.TestLogger.ErrorCount, 0, undefined, "Test Logger started with more than 0 errors.");
        const rightNow = new Date(Date.now());
        this.TestLogger.Report("an error", rightNow);
        Assert_1.Assert.Equals(this.TestLogger.ErrorCount, 1, undefined, "Reported one error, but the ErrorCount is not one.");
        Assert_1.Assert.Defined(this.TestLogger.Logged.get(rightNow), this.TestLogger.Logged.get, "Error does not exist for correct date inputted.");
        Assert_1.Assert.Equals(this.TestLogger.Logged.get(rightNow), "an error", this.TestLogger.Logged.get, "Error for correct date is incorrect.");
        this.TestLogger.ClearLog();
        Assert_1.Assert.Equals(this.TestLogger.ErrorCount, 0, undefined, "Cleared log, but the ErrorCount is not zero.");
        let thrown;
        try {
            const future = new Date(Date.now());
            thrown = this.TestLogger.Throw("another more important error", future);
        }
        catch (err) {
            const distantFuture = new Date(Date.now());
            this.TestLogger.Report(err, distantFuture);
        }
        Assert_1.Assert.Defined(thrown);
        Assert_1.Assert.Equals(thrown.message, "another more important error");
        Assert_1.Assert.Equals(this.TestLogger.ErrorCount, 1);
    }
}
exports.default = ErrorLoggerTest;
