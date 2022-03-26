import { config as InitiateEnv } from "dotenv";
import Ripple from "./Ripple/Client";

InitiateEnv();
new Ripple;

export { Ripple as Client };