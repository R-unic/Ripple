import { on as On } from "process";
import { config as InitiateEnv } from "dotenv";
import { ErrorLogger } from "./Ripple/Components/ErrorLogger";
import Ripple from "./Ripple/Client";

const ProgramLogger = new ErrorLogger;
const ThrowError = (err: string) => 
    ProgramLogger.Report(err, new Date(Date.now()));

InitiateEnv();
new Ripple;

On("unhandledRejection", ThrowError);
On("uncaughtException", ThrowError);

export { Ripple as Client };