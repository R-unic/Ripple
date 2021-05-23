import { ClientEvents } from "discord.js";

const { log, error } = console;

const Events = new Map<keyof ClientEvents, Function>([
    ["ready", () => log("Ripple is now online.")],
    ["error", (err) => error(err)]
]);

export default Events;