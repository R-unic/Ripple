import { on as On } from "process";
import Ripple from "./Ripple/Client";
import { config as InitiateDotEnv } from "dotenv";

InitiateDotEnv();
new Ripple;

On("unhandledRejection", err => new Error(
    typeof err === "string"? 
    err 
    : 
    "Unhandled Promise Rejection" + "\n" + err
));