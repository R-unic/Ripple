import { error, log } from "console";
import { ClientEvents } from "discord.js";
import RippleClient from "./Client";

const Events = new Map<keyof ClientEvents, Function>([
    ["ready", (client: RippleClient) => log(`Ripple ${client.Version} is now online.`)],
    ["error", (_, err) => error(err)]
]);

export default Events;