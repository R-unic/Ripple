import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "directmessage";
        super(name, {
            aliases: [name, "directmsg", "privmsg", "pm", "dm"],
            userPermissions: "MANAGE_GUILD",
            cooldown: 10,
            description: {
                content: "Sends a DM to a member as Ripple.",
                usage: '<@member> <"content">'
            },
            args: [
                Arg("member", "member"),
                Arg("content", "string")
            ],
        });
    }

    public async exec(msg: Message, { member, content }: { member: GuildMember, content: string }) {
        if (!member)
            return this.client.Logger.MissingArgError(msg, "member");

        if (member.user.bot)
            return this.client.Logger.InvalidArgError(msg, "User cannot be a bot!");

        if (!content)
            return this.client.Logger.MissingArgError(msg, "content");

        return member.send(content)
            .then(() => msg.reply(
                this.client.Success()
                    .setDescription(`Successfully sent your DM to ${member}.`)
            ));
    }
}