import { error } from "console";
import { env, on } from "process";
import RippleClient from "./Ripple/Client";
import Events from "./Ripple/Events";
import * as dotenv from "dotenv";

dotenv.config();

const Ripple = new RippleClient(Events);
Ripple.login(env.LOGIN_TOKEN)
    .then(() =>       
        Ripple.user.setPresence({
            status: "online",
            activity: {
                name: `${Ripple.guilds.cache.size} servers | ::help`,
                type: "WATCHING"
            }
        })
    ).catch(error);

on("unhandledRejection", error);