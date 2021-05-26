import { error } from "console";
import { on } from "process";
import RippleClient from "./Ripple/Client";
import Events from "./Ripple/Events";
import * as dotenv from "dotenv";

dotenv.config();

new RippleClient(Events);

on("unhandledRejection", error);