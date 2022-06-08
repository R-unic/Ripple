import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "togglelevelsystem";
        super(name, {
            aliases: [name, "levelsystem", "togglelevels"],
            cooldown: 5e3,
            description: "Toggles the level system on/off."
        });
    }

    public async exec(msg: Message) {
        return this.client.LevelSystem.Toggle(msg)
            .then(toggled => msg.reply(
                this.client.Success(`Successfully ${toggled ? "enabled" : "disabled"} the level system for this server.`)
            ));
    }
}