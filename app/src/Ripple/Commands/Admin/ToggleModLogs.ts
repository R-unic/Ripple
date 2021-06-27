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
        const previous: boolean = await this.client.ModLogs.Get(msg);
        const systemEnabled = !previous;
        return this.client.ModLogs.Set(msg, systemEnabled)
            .then(() => msg.reply(
                this.client.Success(`Successfully ${systemEnabled ? "enabled" : "disabled"} moderator logging for this server. Use \`::modlogschannel #channel\` to assign a channel.`)
            ));
    }
}