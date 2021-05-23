import { AkairoClient as Client, CommandHandler } from "discord-akairo";
import * as dotenv from "dotenv";
import Events from "./Events";
import path = require("path");

dotenv.config();

class Ripple extends Client{
    private commandHandler = new CommandHandler(this, {
        directory: path.join(__dirname, "Commands/"),
        prefix: "::",
        defaultCooldown: 1,
        blockBots: true,
        blockClient: true
    });

    public constructor() {
        super({
            disableMentions: "everyone",
            ownerID: ["415233686758359051", "686418809720012843"]
        });
    }

    public LoadCommands() {
        this.commandHandler.loadAll();
    }
}

const ripple = new Ripple;
Events.forEach((callback, event) => 
    ripple.on(event, (...args: any[]) => callback(...args))
);

ripple.LoadCommands();

ripple.login(process.env.LOGIN_TOKEN as string).catch(console.error);