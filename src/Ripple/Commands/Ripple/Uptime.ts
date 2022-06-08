import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "uptime";
        super(name, {
            aliases: [name, "ut"],
            description: "Returns the amount time Ripple has been on for.",
        });
    }

    public async exec(msg: Message) {
        const uptime = new Date(Date.now() - this.client.uptime);

        return msg.channel.send(
            this.client.Embed("⏲️ Uptime ⏲️")
                .setDescription("Ripple has been online since:")
                .addField("Date", uptime.toLocaleDateString(), true)
                .addField("Time", uptime.toLocaleTimeString(), true)
        );
    }
}