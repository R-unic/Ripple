import { on as On } from "process";
import { config as InitiateDotEnv } from "dotenv";
import { error as ThrowError, log as Print } from "console";
import { exec as RunCommand } from "child_process";
import Ripple from "./Ripple/Client";



InitiateDotEnv();
RunCommand("npm test", (err, res) => 
    err? ThrowError(err) 
    : (() => {
        Print(res);
        new Ripple;
    })()
);

On("unhandledRejection", ThrowError);
On("uncaughtException", ThrowError);