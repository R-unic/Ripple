import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Ripple/Util";
import Ripple from "../../Ripple/Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "kick";
        super(name, {
            aliases: [name, "purgemember", "purgeuser"],
            userPermissions: "KICK_MEMBERS",
            clientPermissions: "KICK_MEMBERS",
            cooldown: 5,
            description: {
                content: "Kicks a member from the server.",
                usage: "<@member> <reason?>"
            },
            args: [
                Arg("member", "member"),
                Arg("reason", "string")
            ],
        });
    }

    public async exec(msg: Message, { member, reason }: { member: GuildMember, reason?: string }) {
        if (!member)
            return this.client.Logger.MissingArgError(msg, "member");

        return member.kick(reason);
    }
}