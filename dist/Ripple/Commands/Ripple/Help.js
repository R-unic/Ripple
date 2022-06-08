"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "help";
        super(name, {
            aliases: [name, "cmds", "helpmenu", "helpme", "commands"],
            description: {
                content: "DMs you a help menu.",
                usage: "<commandCategory?>"
            },
            args: [(0, Util_1.Arg)("commandCategory", "lowercase")]
        });
    }
    exec(msg, { commandCategory }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const prefix = yield this.client.Prefix.Get(msg);
            if (!commandCategory)
                return this.DefaultHelpMenu(prefix, msg);
            const categories = this.handler.categories;
            const category = categories.get((0, Util_1.ToTitleCase)(commandCategory));
            if (!category)
                return this.client.Logger.InvalidArgError(msg, `Category \`${commandCategory}\` does not exist.`);
            const commands = category.array();
            const embed = this.client.Embed(`Commands in \`${(0, Util_1.ToTitleCase)(commandCategory)}\``)
                .setDescription(commands.map(cmd => `\`${cmd.aliases[0]}\``).join(", "));
            return msg.reply(embed);
        });
    }
    DefaultHelpMenu(prefix, msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const embed = this.client.Embed()
                .setTitle("Help Menu")
                .setDescription([
                msg.guild ? `This server's prefix is \`${prefix}\`` : "",
                `For more info about a command, see: \`${prefix}usage <commandName?>\`\n`,
                !msg.guild
                    ? "\nThere are commands that are only usable in servers." +
                        " If you would like to see them, please trigger this command in a server."
                    : "",
            ]);
            for (const [category, commands] of this.handler.categories) {
                const title = category + " Commands";
                if ((!msg.guild && category === "Admin") || (msg.guild && category === "Admin" &&
                    !msg.channel.permissionsFor(msg.member).has("MANAGE_GUILD")))
                    continue;
                let parentCommands = commands.filter(c => Boolean(c.aliases && c.aliases.length));
                if (!msg.guild)
                    parentCommands = parentCommands.filter(c => c.channel !== "guild");
                if (title && parentCommands.size)
                    embed.addField(title, parentCommands.map(c => `\`${c.aliases[0]}\``).join(", "), true);
            }
            embed.fields = embed.fields.sort((a, b) => a.name > b.name ? 1 : (a.name < b.name ? -1 : 0));
            return msg.member.send(embed)
                .then(() => msg.reply(this.client.Success("I sent you a help menu in your DMs! 💖")));
        });
    }
}
exports.default = default_1;
