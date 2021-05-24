import { AkairoClient as Client, CommandHandler } from "discord-akairo";
import { ClientEvents } from "discord.js";
import path = require("path");

export class RippleClient extends Client {
    public readonly Version = "v1.0.0";

    private readonly commandHandler = new CommandHandler(this, {
        directory: path.join(__dirname, "../Commands/"),
        prefix: "::",
        defaultCooldown: 1,
        blockBots: true,
        blockClient: true
    });

    public constructor(
        private events: Map<keyof ClientEvents, Function>
    ) {
        super({
            disableMentions: "everyone",
            ownerID: ["415233686758359051", "686418809720012843"]
        });
        this.HandleEvents();
    }

    public LoadCommands() {
        this.commandHandler.loadAll();
    }

    private HandleEvents() {
        this.events.forEach((callback, event) => 
            this.on(event, (...args: any[]) => callback(...args))
        );
    }
}