"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "questprogress";
        super(name, {
            aliases: [name, "questprog", "quest"],
            description: {
                content: "Returns the percentage of progress you are at in the specified world in Wizard101.",
                usage: "<quest> <world>",
                examples: ["24 wc", "45 karamelle"]
            },
            args: [
                (0, Util_1.Arg)("quest", "number", 0),
                (0, Util_1.Arg)("worldName", "lowercase")
            ]
        });
    }
    exec(msg, { quest, worldName }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                    return msg.reply(this.client.Embed(`You are \`${progress}%\` through \`${Results.Name}\`. You have \`${Results.Quests - quest}\` quests left.`));
                }
            });
        });
    }
}
exports.default = default_1;
