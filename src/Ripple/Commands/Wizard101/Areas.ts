import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import Wizard101 from "../../APIWrappers/Wizard101";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "areas";
        super(name, {
            aliases: [name, "areasinworld", "areain"],
            description: {
                content: "Returns the areas in a specified world in Wizard101.",
                usage: "<world>",
                examples: ["kt", "ms", "dragonspyre"]
            },
            args: [ Arg("worldName", "string") ]
        });
    }

    public async exec(msg: Message, { worldName }: { worldName: string }) {
        if (!worldName)
            return this.client.Logger.MissingArgError(msg, "worldName");

        const world = Wizard101.GetWorld(worldName)
        const embed = this.client.Embed(`Areas in \`${world.Name}\``)
            .setDescription(`__**There are \`${world.Areas.length}\` areas in \`${world.Name}\`:**__

            ${world.Areas.map(area => area.Name).join("\n")}`);

        return msg.reply(embed);
    }
}