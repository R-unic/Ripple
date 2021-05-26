import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command<RippleClient> {
    public constructor() {
        const name = "uptime";
        super(name, {
            aliases: [name, "ut"],
            description: "Returns the amount time Ripple has been on for.",
        });
    }

    public async exec(msg: Message) {
        const uptime = new Date(this.client.uptime);

        return msg.channel.send(
            this.client.Embed()
                .setTitle("⏲️ Uptime ⏲️")
                .addField("Days", uptime.getDay() - 3)
                .addField("Hours", uptime.getHours() - 16)
                .addField("Minutes", uptime.getMinutes())
                .addField("Seconds", uptime.getSeconds())
        );
    }
}