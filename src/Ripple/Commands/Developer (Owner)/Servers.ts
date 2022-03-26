import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "servers";
        super(name, {
            aliases: [name, "serverlist", "inservers"],
            description: "Returns every server Ripple is a member of.",
            ownerOnly: true
        });
    }

    public async exec(msg: Message) {    
        return msg.reply(
            this.client.Embed("Ripple Servers")
                .setDescription(
                    this.client.guilds.cache
                        .array()
                        .map(s => s.name + " | " + s.id)
                        .join("\n")
                )
        );
    }
}