import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import { Snipe } from "../../Components/DataInterfaces/Snipe";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "editsnipe";
        super(name, {
            aliases: [name, "esnipe", "snipeedit", "snipeedited"],
            userPermissions: "MANAGE_MESSAGES",
            cooldown: 3e3,
            ratelimit: 2,
            description: "Returns the latest edited message in the current channel."
        });
    }

    public async exec(msg: Message) {
        const snipe: Snipe = await this.client.EditSniper.Get(msg.channel as TextChannel);
        if (!snipe || !snipe.Message || !snipe.SenderID)
            return this.client.Logger.CouldNotBeExecutedError(msg, "There is nothing to snipe.");

        const snipeSender = msg.guild.members.resolve(snipe.SenderID)
        if (!snipeSender)
            return this.client.Logger.CouldNotBeExecutedError(msg, "Sender of sniped message has left.");

        return msg.reply(
            this.client.Embed("Last Edited Message")
                .setAuthor(snipeSender.user.tag, snipeSender.user.displayAvatarURL({ dynamic: true }))
                .setDescription(snipe.Message)
        )
    }
}