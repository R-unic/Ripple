"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const dotenv = require("dotenv");
const Events_1 = require("./Events");
const path = require("path");
dotenv.config();
class Ripple extends discord_akairo_1.AkairoClient {
    constructor() {
        super({
            disableMentions: "everyone",
            ownerID: ["415233686758359051", "686418809720012843"]
        });
        this.commandHandler = new discord_akairo_1.CommandHandler(this, {
            directory: path.join(__dirname, "Commands/"),
            prefix: "::",
            defaultCooldown: 1,
            blockBots: true,
            blockClient: true
        });
    }
    LoadCommands() {
        this.commandHandler.loadAll();
    }
}
const ripple = new Ripple;
Events_1.default.forEach((callback, event) => ripple.on(event, (...args) => callback(...args)));
ripple.LoadCommands();
ripple.login(process.env.LOGIN_TOKEN).catch(console.error);
//# sourceMappingURL=Main.js.map