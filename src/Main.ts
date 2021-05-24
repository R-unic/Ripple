import { error } from "console";
import RippleClient from "./Ripple/Client";
import Events from "./Ripple/Events";
import * as dotenv from "dotenv";

dotenv.config();

const Ripple = new RippleClient(Events);
Ripple.login(process.env.LOGIN_TOKEN as string)
    .then(() =>       
        Ripple.user.setPresence({
            status: "online",
            activity: {
                name: `${Ripple.guilds.cache.size} servers | ::help`,
                type: "WATCHING"
            }
        })
    ).catch(error);

process.on("unhandledRejection", error);