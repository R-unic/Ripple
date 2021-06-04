import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
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
                Arg("quest", "number", 0),
                Arg("worldName", "lowercase")
            ]
        });
    }

    public async exec(msg: Message, { quest, worldName }: { quest: number, worldName: string }) {
        if (!worldName)
            return this.client.Logger.MissingArgError(msg, "worldName");

        if (!quest)
            return this.client.Logger.MissingArgError(msg, "quest");

        const res = await this.client.Wizard101.GetWorld(worldName);
        if (!res.Success)
            return this.client.Logger.APIError(msg, res.Results.Message);
        else {
            const world = res.Results;
            if (quest > world.Quests)
                quest = world.Quests;
            else if (quest <= 0)
                quest = Math.abs(quest);
            else if (quest < 1)
                quest = 1;

            const progress = ((quest / world.Quests) * 100).toFixed(2);
            return msg.reply(
                this.client.Embed(`You are \`${progress}%\` through \`${world.Name}\`. You have \`${world.Quests - quest}\` quests left.`)
            );
        }
    }
}