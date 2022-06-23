import { Command } from "discord-akairo";
import { Message, PermissionResolvable } from "discord.js";
import { Arg, ToTitleCase } from "../../Util";
import Ripple from "../../Client";
import { PremiumCommand } from "../../Components/CommandClasses/PremiumCommand";
import formatDuration from "format-duration";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "commandusage";
        super(name, {
            aliases: [name, "cmdusage", "commandinfo", "cmdinfo", "usage"],
            description: {
                content: "Returns an embed containing all necessary information to use a command.",
                usage: "<commandName>"
            },
            args: [ Arg("command", "commandAlias") ]
        });
    }

    public async exec(msg: Message, { command }: { command: Command<Ripple> }) {
        if (!command)
            return this.client.Logger.MissingArgError(msg, "command");

        const prefix = await this.client.Prefix.Get(msg);
        const descIsString = typeof command.description === "string";
        let userPerms
        let clientPerms
        if (command.userPermissions instanceof Array)
            userPerms = (<PermissionResolvable[]>command.userPermissions).map(p => ToTitleCase(p.toString())).join(", ");
        else
            userPerms = command.userPermissions;
        if (command.clientPermissions instanceof Array)
            clientPerms = (<PermissionResolvable[]>command.clientPermissions).map(p => ToTitleCase(p.toString())).join(", ");
        else
            clientPerms = command.clientPermissions;

        return msg.reply(
            this.client.Embed(`How To Use \`${prefix}${command.aliases[0]}\``)
                .setDescription(descIsString ? command.description : command.description.content)
                .addField("Arguments", descIsString ? "None" : command.description.usage, true)
                .addField("Cooldown", command.cooldown ? formatDuration(command.cooldown) : "None", true)
                .addField("Aliases", command.aliases.slice(1, -1).map(a => `\`${a}\``).join(", "), true)
                .addField("Examples", command.description?.examples?.map(a => `\`${a}\``)?.join(", ")?? "None", true)
                .addField("Owner Only", command.ownerOnly ? "Yes" : "No", true)
                .addField("Premium Only", command instanceof PremiumCommand ? "Yes" : "No", true)
                .addField("Required User Permissions", 
                    userPerms?
                    `\`${userPerms}\``
                    :"None",
                true)
                .addField("Required Bot Permissions", 
                clientPerms?
                    `\`${clientPerms}\``
                    :"None",
                true)
        );
    }

} 