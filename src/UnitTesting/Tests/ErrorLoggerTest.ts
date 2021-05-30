import { Assert } from "../API/Assert";
import { Test } from "../API/Test";
import { ErrorLogger } from "../../Ripple/Components/ErrorLogger";

export default class ErrorLoggerTest implements Test {
    public readonly TestLogger = new ErrorLogger;

    public Run() {        
        Assert.Defined(this.TestLogger, undefined, "Test Logger does not exist.");
        Assert.Defined(this.TestLogger.Log, undefined, "Test Logger does not have a 'Log' property.");
        Assert.Equals(this.TestLogger.ErrorCount, 0, undefined, "Test Logger started with more than 0 errors.");

        const rightNow = new Date(Date.now())
        this.TestLogger.Report("an error", rightNow);
        Assert.Equals(this.TestLogger.ErrorCount, 1, undefined, "Reported one error, but the ErrorCount is not one.");
        Assert.Defined(this.TestLogger.Log.get(rightNow), this.TestLogger.Log.get, "Error does not exist for correct date inputted.");
        Assert.Equals(this.TestLogger.Log.get(rightNow), "an error", this.TestLogger.Log.get, "Error for correct date is incorrect.");

        this.TestLogger.ClearLog();
        Assert.Equals(this.TestLogger.ErrorCount, 0, undefined, "Cleared log, but the ErrorCount is not zero.");

        let thrown: Error;
        try {
            const future = new Date(Date.now());
            thrown = this.TestLogger.Throw("another more important error", future);
        } catch (err) {
            const distantFuture = new Date(Date.now());
            this.TestLogger.Report(err, distantFuture);
        }
        
        Assert.Defined(thrown);
        Assert.Equals(thrown.message, "another more important error")
        Assert.Equals(this.TestLogger.ErrorCount, 1);
    }
}