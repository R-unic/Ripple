import { Command } from "discord-akairo";
import { Message, PermissionResolvable } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";
import { PremiumCommand } from "../../Components/CommandClasses/PremiumCommand";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "commandusage";
        super(name, {
            aliases: [name, "cmdusage", "commandinfo", "cmdinfo", "usage", "cmd"],
            description: {
                content: "DMs you a help menu.",
                usage: "<commandName?>"
            },
            args: [ Arg("command", "commandAlias") ]
        });
    }

    public async exec(msg: Message, { command }: { command: Command<Ripple> }) {
        if (!command)
            return this.client.Logger.MissingArgError(msg, "command");

        const prefix = await this.client.Prefix.Get(msg);
        const descIsString = typeof command.description === "string";
        const userPerms = command.userPermissions as PermissionResolvable;
        const clientPerms = command.clientPermissions as PermissionResolvable;

        return msg.reply(
            this.client.Embed(`How To Use \`${prefix}${command.aliases[0]}\``)
                .setDescription(descIsString ? command.description : command.description.content)
                .addField("Args", descIsString ? "None" : command.description.usage, true)
                .addField("Cooldown", command.cooldown ? command.cooldown : "None", true)
                .addField("Aliases", command.aliases.map(a => `\`${a}\``).join(", "), true)
                .addField("Owner Only", command.ownerOnly ? "Yes" : "No")
                .addField("Premium Only", command instanceof PremiumCommand ? "Yes" : "No", true)
                .addField("Required User Permissions", 
                    userPerms?
                    `\`${userPerms.toString()}\``
                    :"None",
                true)
                .addField("Required Bot Permissions", 
                clientPerms?
                    `\`${clientPerms.toString()}\``
                    :"None",
                true)
        );
    }

} 