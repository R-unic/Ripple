import { Command } from "discord-akairo";
import { Message, Role } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "setautorole";
        super(name, {
            aliases: [name, "setjoinrole", "autorole", "joinrole"],
            userPermissions: "MANAGE_ROLES",
            clientPermissions: "MANAGE_ROLES",
            cooldown: 3e3,
            description: {
                content: "Sets a role to be assigned upon a user joining.",
                usage: "<@role?>"
            },
            args: [ Arg("role", "role") ],
        });
    }

    public async exec(msg: Message, { role }: { role: Role }) {
        if (!role) {
            await this.client.AutoRole.Set(msg, undefined)
            return msg.reply(
                this.client.Success("Successfully disabled autorole.")
            );
        }

        return this.client.AutoRole.Set(msg, role.id)
            .then(() => msg.reply(
                this.client.Success(`Successfully set autorole to ${role}.`)
            )).catch(err => this.client.Logger.DatabaseError(msg, err));
    }
}