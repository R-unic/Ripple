import { Command } from "discord-akairo";
import { Message, Role } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "prestigerole";
        super(name, {
            aliases: [name, "setprestigerole", "assignprestigerole"],
            userPermissions: "MANAGE_ROLES",
            clientPermissions: "MANAGE_ROLES",
            cooldown: 5e3,
            description: {
                content: "Sets a role to be assigned upon a user reaching provided prestige, or resets a previous assignment.",
                usage: "<@role> <prestige?>"
            },
            args: [ 
                Arg("role", "role"),
                Arg("prestige", "number")
            ],
        });
    }

    public async exec(msg: Message, { role, prestige }: { role: Role, prestige?: number }) {
        if (!role)
            return this.client.Logger.MissingArgError(msg, "role");

        if (!prestige) {
            const rolesPrestige = await this.client.PrestigeRoles.Get(role);
            if (!rolesPrestige)
                return this.client.Logger.InvalidArgError(msg, "Role provided is not assigned to any prestige level.");

            return this.client.PrestigeRoles.Set(role, undefined)
                .then(() => msg.reply(
                    this.client.Success(`Successfully unassigned ${role} from prestige \`${rolesPrestige}\`.`)
                ));
        } else
            return this.client.PrestigeRoles.Set(role, prestige)
                .then(() => msg.reply(
                    this.client.Success(`Successfully assigned ${role} to prestige \`${prestige}\`.`)
                ));
    }
}