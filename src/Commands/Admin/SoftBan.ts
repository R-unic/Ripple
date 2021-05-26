import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "softban";
        super(name, {
            aliases: [name, "softbanish", "tempbanish", "tempban"],
            userPermissions: "BAN_MEMBERS",
            clientPermissions: "BAN_MEMBERS",
            cooldown: 5,
            description: {
                content: "Banishes a member from the server temporarily.",
                usage: "<@member> <days> <reason?>"
            },
            args: [
                {
                    id: "member",
                    type: "member"
                },
                {
                    id: "days",
                    type: "number"
                },
                {
                    id: "reason",
                    type: "string"
                }
            ],
        });
    }

    public async exec(msg: Message, { member, days, reason }: { member: GuildMember, days: number, reason?: string }) {
        const client = this.client as RippleClient;

        if (!member)
            return client.Logger.MissingArgError(msg, "member");

        if (!days)
            return client.Logger.MissingArgError(msg, "days");

        return member.ban({
            reason: reason,
            days: days
        });
    }
}