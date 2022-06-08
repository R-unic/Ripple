import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "togglepurging";
        super(name, {
            aliases: [name, "togglepurge", "togglepurgecommand", "purgecommand"],
            cooldown: 5e3,
            description: "Toggles the Purge command on/off."
        });
    }

    public async exec(msg: Message) {
        return this.client.Purge.Toggle(msg)
            .then(toggled => msg.reply(
                this.client.Success(`Successfully ${toggled ? "enabled" : "disabled"} the purge command for this server.`)
            ));
    }
}