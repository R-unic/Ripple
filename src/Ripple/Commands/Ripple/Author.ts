import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { User } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "author";
        super(name, {
            aliases: [name, "creator", "maker", "dev", "developer"],
            description: "Returns the author of Ripple."
        });
    }

    public async exec(msg: Message) {        
        return msg.reply(
            this.client.Embed("Author")
                .setDescription(`Ripple was made by ${(<string[]>this.client.ownerID).map(User).join(", ")}`)
        );
    }
}