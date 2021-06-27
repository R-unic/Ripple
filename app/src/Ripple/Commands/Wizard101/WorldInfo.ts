import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "worldinfo";
        super(name, {
            aliases: [name, "aboutworld", "world"],
            description: {
                content: "Returns information about the specified world in Wizard101.",
                usage: '<"world">',
                examples: ["kt", "ms", "dragonspyre"]
            },
            args: [ Arg("worldName", "lowercase") ]
        });
    }

    public async exec(msg: Message, { worldName }: { worldName: string }) {
        if (!worldName)
            return this.client.Logger.MissingArgError(msg, "worldName");

        const res = await this.client.Wizard101.GetWorld(worldName);  
        if (!res.Success)
            return this.client.Logger.APIError(msg, res.Results.Message);
        else {   
            const world = res.Results;
            const levels = world.LevelRange;
            const embed = this.client.Embed(world.Name + ` (${world.Abbreviation.toUpperCase()})`)
                .addField("Areas", world.Areas.length, true)
                .addField("Quests", world.Quests, true)
                .addField("Levels", `${levels.First}-${levels.Second}`, true)

            return msg.reply(embed);
        }
    }
}