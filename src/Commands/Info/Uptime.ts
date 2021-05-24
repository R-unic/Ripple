import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "uptime";
        super(name, {
            aliases: [name, "ut"],
            description: "Returns the amount time Ripple has been on for.",
        });
    }

    public async exec(msg: Message) {
        const client = this.client as RippleClient;
        const uptime = new Date(this.client.uptime);

        return msg.channel.send(
            client.Embed()
                .setTitle("Uptime")
                .addField("Days", uptime.getDay() - 3, true)
                .addField("Hours", uptime.getHours() - 16, true)
                .addField("Minutes", uptime.getMinutes(), true)
                .addField("Seconds", uptime.getSeconds(), true)
        );
    }
}