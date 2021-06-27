import { on as On } from "process";
import { config as InitiateEnv } from "dotenv";
import {log as Print } from "console";
import { exec as RunCommand } from "child_process";
import { ErrorLogger } from "./Ripple/Components/ErrorLogger";
import Ripple from "./Ripple/Client";

const ProgramLogger = new ErrorLogger;

const ThrowError = (err: string) => 
    ProgramLogger.Report(err, new Date(Date.now()));

InitiateEnv();
RunCommand("npm test", (err, res) => 
    err? 
        ThrowError(err.message) 
        :(() => {
            Print(res);
            new Ripple;
        })()
);

On("unhandledRejection", ThrowError);
On("uncaughtException", ThrowError);

export { Ripple as Client };