import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "tagcount";
        super(name, {
            aliases: [name, "counttags", "tagamount"],
            description: "Returns how many tags exist in this guild"
        });
    }

    public async exec(msg: Message) {
        const tags = await this.client.Tags.Get(msg);
        return msg.reply(
            this.client.Embed(`\`${msg.guild.name}\`'s Tags`)
                .setDescription(`\`${msg.guild.name}\` has ${tags.length} tags.`)
        );
    }
}