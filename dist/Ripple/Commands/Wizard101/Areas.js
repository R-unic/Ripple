"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "areas";
        super(name, {
            aliases: [name, "areasinworld", "areain"],
            description: {
                content: "Returns the areas in a specified world in Wizard101.",
                usage: "<world>",
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
                const embed = this.client.Embed(`Areas in \`${world.Name}\``)
                    .setDescription(`__**There are \`${world.Areas.length}\` areas in \`${world.Name}\`:**__

                ${world.Areas.join("\n")}`);
                return msg.reply(embed);
            }
        });
    }
}
exports.default = default_1;
