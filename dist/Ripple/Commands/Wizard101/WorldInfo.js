"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "worldinfo";
        super(name, {
            aliases: [name, "aboutworld", "world"],
            description: {
                content: "Returns information about the specified world in Wizard101.",
                usage: '<"world">',
                examples: ["kt", "ms", "dragonspyre"]
            },
            args: [(0, Util_1.Arg)("worldName", "lowercase")]
        });
    }
    exec(msg, { worldName }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!worldName)
                return this.client.Logger.MissingArgError(msg, "worldName");
            const res = yield this.client.Wizard101.GetWorld(worldName);
            if (!res.Success)
                return this.client.Logger.APIError(msg, res.Results.Message);
            else {
                const world = res.Results;
                const levels = world.LevelRange;
                const embed = this.client.Embed(world.Name + ` (${world.Abbreviation.toUpperCase()})`)
                    .addField("Areas", world.Areas.length, true)
                    .addField("Quests", world.Quests, true)
                    .addField("Levels", `${levels.First}-${levels.Second}`, true);
                return msg.reply(embed);
            }
        });
    }
}
exports.default = default_1;
