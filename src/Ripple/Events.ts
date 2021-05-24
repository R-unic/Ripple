import { error, log } from "console";
import { ClientEvents } from "discord.js";

const Events = new Map<keyof ClientEvents, Function>([
    ["ready", () => log(`Ripple is now online.`)],
    ["error", (err) => error(err)]
]);

export default Events;