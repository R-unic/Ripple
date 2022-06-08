import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "togglefiltering";
        super(name, {
            aliases: [name, "togglechatfiltering", "togglechatfilter", "togglefilter"],
            cooldown: 5e3,
            description: "Toggles the chat filtering system on/off."
        });
    }

    public async exec(msg: Message) {
        return this.client.Filtering.Toggle(msg)
            .then(toggled => msg.reply(
                this.client.Success(`Successfully ${toggled ? "enabled" : "disabled"} the level system for this server.`)
            ));
    }
}