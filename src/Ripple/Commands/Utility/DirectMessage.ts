import { PremiumCommand } from "../../Components/CommandClasses/PremiumCommand";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Util";

export default class extends PremiumCommand {
    public constructor() {
        const name = "directmessage";
        super(name, {
            aliases: [name, "directmsg", "privmsg", "pm", "dm"],
            userPermissions: "MANAGE_GUILD",
            cooldown: 10e3,
            description: {
                content: "Sends a DM to a member as Ripple. (PREMIUM ONLY)",
                usage: '<@member> <"content">'
            },
            args: [
                Arg("member", "member"),
                Arg("content", "string")
            ],
        });
    }

    public async exec(msg: Message, { member, content }: { member: GuildMember, content: string }) {
        const error = await this.DoesNotOwnPremium(msg);
        if (error)
            return error;

        if (!member)
            return this.client.Logger.MissingArgError(msg, "member");

        if (member.user.bot)
            return this.client.Logger.InvalidArgError(msg, "User cannot be a bot!");

        if (!content)
            return this.client.Logger.MissingArgError(msg, "content");

        return member.send(content)
            .then(() => {
                msg.reply(this.client.Success()
                    .setDescription(`Successfully sent your DM to ${member}.`));
                msg.delete();
            });
    }
}