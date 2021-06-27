import { Command } from "discord-akairo";
import { Message, Role } from "discord.js";
import { Arg, StripISO, User } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "roleinfo";
        super(name, {
            aliases: [name, "aboutrole"],
            description: {
                content: "Returns information about the role specified.",
                usage: "<@role>"
            },
            args: [ Arg("role", "role") ]
        });
    }

    public async exec(msg: Message, { role }: { role: Role }) {
        if (!role)
            return this.client.Logger.MissingArgError(msg, "role");
        
        return msg.reply(
            this.client.Embed()
                .setTitle(`Information About \`${role.name}\` Role`)
                .setColor(role.hexColor)
                .addField("Created On", StripISO(role.createdAt), true)
                .addField("Mentionable", role.mentionable ? "Yes" : "No", true)
                .addField("Members", role.members.map(m => `@${m.user.tag}`).join(", "), true)
                .addField("Permissions", role.permissions.toArray().join(", "), true)
        );
    }
}