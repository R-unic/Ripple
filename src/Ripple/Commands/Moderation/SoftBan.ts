import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
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
                Arg("member", "member"),
                Arg("days", "number"),
                Arg("reason", "string")
            ],
        });
    }

    public async exec(msg: Message, { member, days, reason }: { member: GuildMember, days: number, reason?: string }) {
        if (!member)
            return this.client.Logger.MissingArgError(msg, "member");

        if (!days)
            return this.client.Logger.MissingArgError(msg, "days");

        return member.ban({
            reason: reason,
            days: days
        }).then(bannedMember => msg.reply(
            this.client.Success(`${bannedMember.user.tag} was successfully temp-banned.`)
                .addField("Reason", reason ?? "n/a")
        )).catch(err => this.client.Logger.DiscordAPIError(msg, err));
    }
}