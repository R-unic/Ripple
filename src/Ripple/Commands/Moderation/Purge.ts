import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import { Arg, Clamp } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "purge";
        super(name, {
            aliases: [name, "bulkdel", "bulkdelete", "nuke", "clear", "prune"],
            userPermissions: "MANAGE_MESSAGES",
            clientPermissions: "MANAGE_MESSAGES",
            cooldown: 4e3,
            description: {
                content: "Deletes a number of messages at once.",
                usage: "<numberOfMessages>"
            },
            args: [ Arg("messagesToRemove", "number") ]
        });
    }

    public async exec(msg: Message, { messagesToRemove }: { messagesToRemove: number }) {        
        if (!messagesToRemove)
            return this.client.Logger.MissingArgError(msg, "messagesToRemove");

        const channel = msg.channel as TextChannel
        if (!channel)
            return msg.reply("Invalid channel!");

        messagesToRemove++;
        return channel.messages.fetch({
            limit: Clamp(messagesToRemove, 1, 100)
        }).then(messages => {
            return channel
                .bulkDelete(messages)
                .then(() => channel.send(this.client.Success(`Bulk delete successful. Total messages removed: ${messages.size}`)))
                .then(sent => sent.delete({ timeout: this.client.Seconds(2.5) }))
                .catch(err => this.client.Logger.DiscordAPIError(msg, err));
        });
    }
}