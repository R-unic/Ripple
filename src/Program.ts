import { on as On } from "process";
import { config as InitiateDotEnv } from "dotenv";
import { error as ThrowError } from "console";
import Ripple from "./Ripple/Client";

InitiateDotEnv();
new Ripple;

On("unhandledRejection", ThrowError);