"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "worlds";
        super(name, {
            aliases: [name, "wizard101worlds", "wizworlds", "worldlist"],
            cooldown: 2e3,
            description: "Returns a list of worlds in Wizard101."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.Wizard101.GetWorlds();
            if (!res.Success)
                return this.client.Logger.APIError(msg, res.Results.Message);
            else {
                const worldMap = new Map(Object.entries(res.Results));
                const embed = this.client.Embed(`Worlds in Wizard101`)
                    .setDescription(`__**There are \`${worldMap.size}\` worlds in Wizard101:**__`);
                worldMap.forEach(world => embed.addField(`${world.Name} (${world.Abbreviation.toUpperCase()})`, `Levels: ${world.LevelRange.First}-${world.LevelRange.Second}
                        Quests: ${world.Quests}
                        Areas: ${world.Areas.length === 0 ? "N/A" : world.Areas.length}`, true));
                return msg.reply(embed);
            }
        });
    }
}
exports.default = default_1;
