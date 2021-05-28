import { on as On } from "process";
import { config as InitiateDotEnv } from "dotenv";
import Ripple from "./Ripple/Client";

InitiateDotEnv();
new Ripple;

On("unhandledRejection", err => new Error(
    typeof err === "string"? 
    err 
    :"Unhandled Promise Rejection" + "\n" + err
));