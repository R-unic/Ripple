import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "ping";
        super(name, {
            aliases: [name, "test"],
            description: "Returns 'Pong!'"
        });
    }

    public async exec(msg: Message) {
        const client = this.client as RippleClient;
        return msg.reply("Ping...")
            .then(async sent => {
                const created = sent.createdTimestamp
                sent.delete();
                return msg.reply(
                    client.Embed()
                        .setTitle("Pong! 🏓")
                        .addField("Latency", `${(Date.now() - created) - 1100}ms`)
                        .addField("Discord API Latency", `${Math.round(client.ws.ping)}ms`)
                )
            })
    }
}