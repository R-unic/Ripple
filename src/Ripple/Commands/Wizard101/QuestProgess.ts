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
                content: "Returns the percentage of progress you are at in the specified world in Wizard101.",
                usage: "<quest> <world>",
                examples: ["24 wc", "45 karamelle"]
            },
            args: [
                Arg("quest", "number"),
                Arg("worldName", "string")
            ]
        });
    }

    public async exec(msg: Message, { quest, worldName }: { quest: number, worldName: string }) {
        if (!worldName)
            return this.client.Logger.MissingArgError(msg, "worldName");

        if (!quest)
            return this.client.Logger.MissingArgError(msg, "quest");

        const world = Wizard101.GetWorld(worldName);
        const progress = world.Progress(quest);
        return msg.reply(
            this.client.Embed(`You are \`${progress}%\` through \`${world.Name}\`.`)
        );
    }
}