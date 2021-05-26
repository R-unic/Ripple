import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Ripple/Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "ping";
        super(name, {
            aliases: [name, "test"],
            description: "Returns 'Pong!'"
        });
    }

    public async exec(msg: Message) {
        return msg.reply("Ping...")
            .then(async sent => {
                const created = msg.createdTimestamp
                sent.delete();
                return msg.reply(
                    this.client.Embed()
                        .setTitle("Pong! 🏓")
                        .addField("Latency", `${sent.createdTimestamp - created}ms`)
                        .addField("Discord API Latency", `${Math.round(this.client.ws.ping)}ms`)
                )
            })
    }
}