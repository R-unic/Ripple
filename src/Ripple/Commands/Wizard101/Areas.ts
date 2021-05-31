import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import Wizard101 from "../../APIWrappers/Wizard101";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "questprogress";
        super(name, {
            aliases: [name, "questprog", "quest"],
            description: {
                content: "Returns the amount of areas in the specified world in Wizard101.",
                usage: "<quest> <world>",
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
            .setDescription(`There are \`${world.Areas.length}\` areas in \`${world.Name}\`.`);

        for (const area of world.Areas)
            embed.addField(area.Name, "", true);

        return msg.reply(embed);
    }
}