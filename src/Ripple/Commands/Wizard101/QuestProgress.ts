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

        return this.client.Wizard101.GetWorld(worldName)
            .then(({ Success, Results }) => {
                if (!Success)
                    return this.client.Logger.APIError(msg, Results.Message);
                else {
                    if (quest > Results.Quests)
                        quest = Results.Quests;
                    else if (quest <= 0)
                        quest = Math.abs(quest);
                    else if (quest < 1)
                        quest = 1;

                    const progress = ((quest / Results.Quests) * 100).toFixed(2);
                    return msg.reply(
                        this.client.Embed(`You are \`${progress}%\` through \`${Results.Name}\`. You have \`${Results.Quests - quest}\` quests left.`)
                    );
                }
            });
    }
}