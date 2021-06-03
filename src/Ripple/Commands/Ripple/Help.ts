import { Command } from "discord-akairo";
import { TextChannel } from "discord.js";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "help";
        super(name, {
            aliases: [name, "cmds", "helpmenu", "helpme"],
            description: {
                content: "DMs you a help menu.",
                usage: "<commandName?>"
            },
            args: [ Arg("command", "commandAlias") ]
        });
    }

    public async exec(msg: Message, { command }: { command: Command }) {
        const prefix = await this.client.Prefix.Get(msg);

        if (!command)
            return this.defaultHelpMenu(prefix, msg);

        const clientPermissions = command.clientPermissions as string[];
        const userPermissions = command.userPermissions as string[];
        const examples: string[] = command.description.examples;
        const embed = this.client.Embed()
            .setTitle(`${prefix}${command} ${command.description.usage ? command.description.usage : ""}`)
            .setDescription(typeof command.description === "string" ? command.description : command.description.content);

        if (clientPermissions)
            embed.addField("Required Bot Permissions:", clientPermissions, true);
        if (userPermissions)
            embed.addField("Required User Permissions:", userPermissions, true);
        if (command.aliases.length > 1)
            embed.addField("Aliases", command.aliases.slice(1).map(a => `\`${a}\``).join(", "), true);
        if (examples)
            embed.addField("Examples", examples.map(e => `${prefix}${command} ${e}`).join("\n"), true);

        return msg.reply(embed);
    }

    public async defaultHelpMenu(prefix: string, msg: Message) {
        const embed = this.client.Embed()
            .setTitle("Help Menu")
            .setDescription([
                msg.guild ? `This server's prefix is \`${prefix}\`` : "",
                `For more info about a command, see: \`${prefix}help <commandName?>\`\n`,
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