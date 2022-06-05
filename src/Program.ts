import { config as InitiateEnv } from "dotenv";
import Ripple from "./Ripple/Client";

InitiateEnv({ path: `${__dirname}/../.env` });
new Ripple;

export { Ripple as Client };