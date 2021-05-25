import { Command } from "discord-akairo";
import { TextChannel } from "discord.js";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

const toTitleCase = (item: string) => {
    return item
        .toLowerCase()
        .replace(/guild/g, 'Server')
        .replace(/_/g, ' ')
        .replace(/\b[a-z]/g, t => t.toUpperCase());
};

export default class extends Command {
    public constructor() {
        const name = "help";
        super(name, {
            aliases: [name, "cmds", "helpme"],
            description: {
                content: "DMs you a help menu.",
                usage: "<commandName?>"
            },
            args: [
                {
                    id: "command",
                    type: "commandAlias"
                }
            ]
        });
    }

    public async exec(msg: Message, { command }: { command: Command }) {
        const client = this.client as RippleClient;
        const prefix = client.Prefix;
        if (!command) return this.defaultHelpMenu(client, msg);

        const clientPermissions = command.clientPermissions as string[];
        const userPermissions = command.userPermissions as string[];
        const examples: string[] = command.description.examples;

        const embed = client.Embed()
            .setTitle(`${prefix}${command} ${command.description.usage ? command.description.usage : ""}`)
            .setDescription(typeof command.description === "string" ? command.description : command.description.content)

        if (clientPermissions)
            embed.addField("Required Bot Permissions", clientPermissions);
        if (userPermissions)
            embed.addField("Required User Permissions:", userPermissions);
        if (command.aliases.length > 1)
            embed.addField("Aliases", command.aliases.slice(1).map(a => `\`${a}\``).join(", "));
        if (examples)
            embed.addField("Examples", examples.map(e => `${prefix}${command} ${e}`).join("\n"));

        return msg.reply(embed);
    }

    public async defaultHelpMenu(client: RippleClient, msg: Message) {
        const prefix = client.Prefix;
        const embed = client.Embed()
            .setTitle("Commands")
            .setDescription([
                msg.guild ? `This server's prefix is \`${prefix}\`` : "",
                `For more info about a command, see: \`${prefix}help <commandName?>\`\n`,
                !msg.guild
                    // tslint:disable-next-line:prefer-template
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
                embed.addField(title, parentCommands.map(c => `\`${c.aliases[0]}\``).join(", "));
        }

        embed.fields = embed.fields.sort((a, b) => a.name > b.name ? 1 : (a.name < b.name ? -1 : 0));

        return msg.member.send(embed)
            .then(() => msg.reply("I sent you a help menu in your DMs! 💖"));;
    }
}