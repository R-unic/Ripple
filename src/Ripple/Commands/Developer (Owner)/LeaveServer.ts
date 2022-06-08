import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "leaveserver";
        super(name, {
            aliases: [name, "exitserver", "leave"],
            description: "Forces Ripple to leave the server.",
            ownerOnly: true
        });
    }

    public async exec(msg: Message) {    
        return msg.reply(
            this.client.Success("Successfully left the guild.")
        ).then(() => msg.guild.leave());
    }
}