import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import { Snipe } from "../../Components/DataInterfaces/Snipe";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "snipe";
        super(name, {
            aliases: [name, "dsnipe", "deletesnipe", "snipedelete", "snipedeleted"],
            userPermissions: "MANAGE_MESSAGES",
            cooldown: 3e3,
            ratelimit: 2,
            description: "Returns the latest deleted message in the current channel."
        });
    }

    public async exec(msg: Message) {
        const snipe: Snipe = await this.client.DeleteSniper.Get(msg.channel as TextChannel);
        if (!snipe || !snipe.Message || !snipe.SenderID)
            return this.client.Logger.CouldNotBeExecutedError(msg, "There is nothing to snipe.");

        const snipeSender = msg.guild.members.resolve(snipe.SenderID)
        if (!snipeSender)
            return this.client.Logger.CouldNotBeExecutedError(msg, "Sender of sniped message has left.");

        return msg.reply(
            this.client.Embed("Last Deleted Message")
                .setAuthor(snipeSender.user.tag, snipeSender.user.displayAvatarURL({ dynamic: true }))
                .setDescription(snipe.Message)
        )
    }
}