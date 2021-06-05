import { Command } from "discord-akairo";
import { Message, Role } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "setchatreviverole";
        super(name, {
            aliases: [name, "chatreviverole"],
            cooldown: 5e3,
            description: {
                content: "Sets the role to be pinged when `::chatrevive` is used, or resets it.",
                usage: "<@role?>"
            },
            args: [ Arg("role", "role", msg => msg.guild.roles.everyone) ]
        });
    }

    public async exec(msg: Message, { role }: { role: Role }) {
        return this.client.ChatReviveRole.Set(msg, role.id)
            .then(() => msg.reply(
                this.client.Success(role ? `Successfully set chat revive role to ${role}.` : `Successfully reset chat revive role to ${msg.guild.roles.everyone}.`)
            ));
    }
}