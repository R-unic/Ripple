import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "toggleeconomy";
        super(name, {
            aliases: [name, "toggleeco", "toggleecosystem", "toggleeconomysystem"],
            cooldown: 5e3,
            description: "Toggles the economy system on/off."
        });
    }

    public async exec(msg: Message) {
        return this.client.Economy.Toggle(msg)
            .then(toggled => msg.reply(
                this.client.Success(`Successfully ${toggled ? "enabled" : "disabled"} the economy system for this server.`)
            ));
    }
}