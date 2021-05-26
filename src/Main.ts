import { error } from "console";
import { on } from "process";
import Ripple from "./Ripple/Client";
import * as dotenv from "dotenv";

dotenv.config();

new Ripple;

on("unhandledRejection", error);