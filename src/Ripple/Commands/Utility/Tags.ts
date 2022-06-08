import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "tags";
        super(name, {
            aliases: [name, "guildtags", "servertags"],
            description: "Returns all tags in the guild executed in."
        });
    }

    public async exec(msg: Message) {
        const tags = await this.client.Tags.Get(msg);
        return msg.reply(
            this.client.Embed(`\`${msg.guild.name}\`'s Tags`)
                .setDescription(
                    tags
                        .map(t => `\`${t.Name}\``)
                        .join(",\n")
                        .slice(0, 1022)
                )
        );
    }
}