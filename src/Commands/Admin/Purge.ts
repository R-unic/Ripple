import { error } from "console";
import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "purge";
        super(name, {
            aliases: [name, "bulkdel", "bulkdelete", "nuke", "clear"],
            userPermissions: "MANAGE_MESSAGES",
            clientPermissions: "MANAGE_MESSAGES",
            cooldown: 5,
            description: {
                content: "Deletes a number of messages at once.",
                usage: "<numberOfMessages>"
            },
            args: [
                {
                    id: "messagesToRemove",
                    type: "number",
                    default: 0
                }
            ],
        });
    }

    public async exec(msg: Message, { messagesToRemove }: { messagesToRemove: number }) {
        const client = this.client as RippleClient;
        if (!messagesToRemove || messagesToRemove === 0)
            return client.MissingArg(msg, "messagesToRemove");

        const channel = msg.channel as TextChannel
        if (!channel)
            return msg.reply("Invalid channel!");

        messagesToRemove++;
        channel
            .messages.fetch({
                limit: messagesToRemove
            })
            .then(messages => {
                channel.bulkDelete(messages);
                channel
                    .send(`Bulk delete successful. Total messages removed: ${messagesToRemove}`)
                    .then(sent => sent.delete({ timeout: client.Seconds(10) }));
            })
            .catch(error);
    }
}