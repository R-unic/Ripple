import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "ban";
        super(name, {
            aliases: [name, "permbanish", "permban", "banish"],
            userPermissions: "BAN_MEMBERS",
            clientPermissions: "BAN_MEMBERS",
            cooldown: 5,
            description: {
                content: "Banishes a member from the server permanently.",
                usage: "<@member> <reason?>"
            },
            args: [
                {
                    id: "member",
                    type: "member"
                },
                {
                    id: "reason",
                    type: "string"
                }
            ],
        });
    }

    public async exec(msg: Message, { member, reason }: { member: GuildMember, reason?: string }) {
        const client = this.client as RippleClient;

        if (!member)
            return client.Logger.MissingArgError(msg, "member");

        return member.ban({
            reason: reason
        });
    }
}