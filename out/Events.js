"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { log, error } = console;
const Events = new Map([
    ["ready", () => log("Ripple is now online.")],
    ["error", (err) => error(err)]
]);
exports.default = Events;
//# sourceMappingURL=Events.js.map