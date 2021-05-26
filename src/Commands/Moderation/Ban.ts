import { Argument, Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Ripple/Util";
import RippleClient from "../../Ripple/Client";

export default class extends Command<RippleClient> {
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
                Arg("member", "member"),
                Arg("reason", "string")
            ],
        });
    }

    public async exec(msg: Message, { member, reason }: { member: GuildMember, reason?: string }) {
        if (!member)
            return this.client.Logger.MissingArgError(msg, "member");

        return member.ban({
            reason: reason
        });
    }
}