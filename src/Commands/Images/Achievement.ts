import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Ripple/Util";
import Ripple from "../../Ripple/Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "achievement";
        super(name, {
            aliases: [name, "achievementget", "mcachieve", "achieve"],
            description: {
                content: "Returns a fake Minecraft achievement with the text provided.",
                usage: '<"achievement">',
                examples: ['"Go bankrupt"']
            },
            args: [ Arg("achievement", "string") ]
        });
    }

    public async exec(msg: Message, { achievement }: { achievement: string }) {
        if (!achievement)
            return this.client.Logger.MissingArgError(msg, "achievement");

        if (achievement.length > 21)
            return this.client.Logger.InvalidArgError(msg, "Text is longer than 21 characters.");

        return msg.reply(
            this.client.Embed("Minecraft Achievement")
                .setImage(`https://minecraftskinstealer.com/achievement/1/Achievement%20Get!/${encodeURIComponent(achievement)}`)
        );
    }   
}