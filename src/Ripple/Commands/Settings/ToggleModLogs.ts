import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "togglemodlogs";
        super(name, {
            aliases: [name, "modlogs"],
            cooldown: 5e3,
            description: "Toggles the moderator logging system on/off."
        });
    }

    public async exec(msg: Message) {
        return this.client.ModLogs.Toggle(msg)
            .then(toggled => msg.reply(
                this.client.Success(`Successfully ${toggled ? "enabled" : "disabled"} moderator logging for this server. Use \`${this.prefix}modlogschannel #channel\` to assign a channel.`)
            ));
    }
}