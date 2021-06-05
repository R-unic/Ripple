import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "levelsystem";
        super(name, {
            aliases: [name, "togglelevelsystem", "togglelevels"],
            cooldown: 5e3,
            description: "Toggles the level system on/off."
        });
    }

    public async exec(msg: Message) {
        const previous: boolean = await this.client.LevelSystem.Get(msg);
        const systemEnabled = !previous;
        return this.client.LevelSystem.Set(msg, systemEnabled)
            .then(() => msg.reply(
                this.client.Success(`Successfully ${systemEnabled ? "enabled" : "disabled"} the level system for this server.`)
            ));
    }
}