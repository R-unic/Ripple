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
                content: "Sends a DM to a user as Ripple. (PREMIUM ONLY)",
                usage: '<@user> <"content">'
            },
            args: [
                Arg("user", "user"),
                Arg("content", "string")
            ],
        });
    }

    public async exec(msg: Message, { user, content }: { user: GuildMember, content: string }) {
        const error = await this.DoesNotOwnPremium(msg);
        if (error)
            return error;

        if (!user)
            return this.client.Logger.MissingArgError(msg, "user");

        if (user.user.bot)
            return this.client.Logger.InvalidArgError(msg, "User cannot be a bot!");

        if (!content)
            return this.client.Logger.MissingArgError(msg, "content");

        return user.send(content)
            .then(() => {
                msg.reply(this.client.Success()
                    .setDescription(`Successfully sent your DM to ${user}.`));
                msg.delete();
            });
    }
}