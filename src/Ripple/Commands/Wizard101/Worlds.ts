import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Wizard101 } from "../../APIWrappers/Wizard101";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "worlds";
        super(name, {
            aliases: [name, "wizard101worlds", "wizworlds", "worldlist"],
            cooldown: 2e3,
            description: "Returns a list of worlds in Wizard101."
        });
    }

    public async exec(msg: Message) {
        const embed = this.client.Embed(`Worlds in Wizard101`)
            .setDescription(`__**There are \`${Wizard101.Worlds.size}\` worlds in Wizard101:**__`);

        Wizard101.Worlds.forEach(
            world => embed.addField(
                    `${world.Name} (${world.Abbreviation})`,
                    `Levels: ${world.LevelRange.First}-${world.LevelRange.Second}
                    Quests: ${world.Quests}
                    Areas: ${world.Areas.length === 0 ? "N/A" : world.Areas.length}`, 
                    true
                )
            );

        return msg.reply(embed);
    }
}