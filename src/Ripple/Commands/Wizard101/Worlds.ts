import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { World } from "wizard101-api";
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
        const res = await this.client.Wizard101.GetWorlds();
        if (!res.Success)
            return this.client.Logger.APIError(msg, res.Results.Message);
        else {
            const worldMap = new Map<string, World>(Object.entries(res.Results));
            const embed = this.client.Embed(`Worlds in Wizard101`)
                .setDescription(`__**There are \`${worldMap.size}\` worlds in Wizard101:**__`);

            worldMap.forEach(
                world => embed.addField(
                        `${world.Name} (${world.Abbreviation.toUpperCase()})`,
                        `Levels: ${world.LevelRange.First}-${world.LevelRange.Second}
                        Quests: ${world.Quests}
                        Areas: ${world.Areas.length === 0 ? "N/A" : world.Areas.length}`, 
                        true
                    )
                );

            return msg.reply(embed);
        }
    }
}