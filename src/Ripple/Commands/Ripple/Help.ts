import { Command } from "discord-akairo";
import { TextChannel } from "discord.js";
import { Message } from "discord.js";
import { Arg, ToTitleCase } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "help";
        super(name, {
            aliases: [name, "cmds", "helpmenu", "helpme"],
            description: {
                content: "DMs you a help menu.",
                usage: "<commandCategory?>"
            },
            args: [ Arg("commandCategory", "lowercase") ]
        });
    }

    public async exec(msg: Message, { commandCategory }: { commandCategory: string }) {
        const prefix = await this.client.Prefix.Get(msg);
        if (!commandCategory)
            return this.DefaultHelpMenu(prefix, msg);

        const categories = this.handler.categories;
        const category = categories.get(ToTitleCase(commandCategory));
        if (!category)
            return this.client.Logger.InvalidArgError(msg, `Category \`${commandCategory}\` does not exist.`);

        const commands = category.array();
        const embed = this.client.Embed(`Commands in \`${ToTitleCase(commandCategory)}\``)
            .setDescription(commands.map(cmd => `\`${cmd.aliases[0]}\``).join(", "))

        return msg.reply(embed);
    }

    private async DefaultHelpMenu(prefix: string, msg: Message) {
        const embed = this.client.Embed()
            .setTitle("Help Menu")
            .setDescription([
                msg.guild ? `This server's prefix is \`${prefix}\`` : "",
                `For more info about a command, see: \`${prefix}usage <commandName?>\`\n`,
                !msg.guild
                    ? "\nThere are commands that are only usable in servers." +
                    " If you would like to see them, please trigger this command in a server."
                    : "",
            ])

        for (const [category, commands] of this.handler.categories) {
            const title = category + " Commands";

            if (
                (!msg.guild && category === "Admin") || (
                    msg.guild && category === "Admin" &&
                    !(msg.channel as TextChannel).permissionsFor(msg.member).has("MANAGE_GUILD")
                )
            ) continue;

            let parentCommands = commands.filter(c => Boolean(c.aliases && c.aliases.length));

            if (!msg.guild) parentCommands = parentCommands.filter(c => c.channel !== "guild");
            if (title && parentCommands.size)
                embed.addField(title, parentCommands.map(c => `\`${c.aliases[0]}\``).join(", "), true);
        }

        embed.fields = embed.fields.sort((a, b) => a.name > b.name ? 1 : (a.name < b.name ? -1 : 0));

        return msg.member.send(embed)
            .then(() => msg.reply(
                this.client.Success("I sent you a help menu in your DMs! 💖")
            ));
    }
}