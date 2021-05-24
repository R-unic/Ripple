import { error } from "console";
import { RippleClient } from "./Ripple/Client";
import * as dotenv from "dotenv";
import Events from "./Ripple/Events";

dotenv.config();

const Ripple = new RippleClient(Events);
Ripple.LoadCommands();
Ripple.login(process.env.LOGIN_TOKEN as string)
    .then(() => 
        Ripple.user.setPresence({
            status: "online",
            activity: {
                name: `::help | ${Ripple.Version} by <@!415233686758359051>`,
                type: "WATCHING"
            }
        })
    ).catch(error);