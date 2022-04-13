import { Command } from "discord-akairo";
import { GuildMember, Message, TextChannel } from "discord.js";
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
                usage: "<numberOfMessages> <@member?>"
            },
            args: [ 
                Arg("messagesToRemove", "number"),
                Arg("member", "member")
            ]
        });
    }

    public async exec(msg: Message, { messagesToRemove, member }: { messagesToRemove: number, member: GuildMember }) {
        if (!await this.client.Purge.Get(msg.member))
            return this.client.Logger.CouldNotBeExecutedError(msg, "This guild has purging disabled.");

        if (!messagesToRemove)
            return this.client.Logger.MissingArgError(msg, "messagesToRemove");

        const chnl = <TextChannel>msg.channel;
        if (!chnl)
            return this.client.Logger.InvalidArgError(msg, "Invalid channel.");

        messagesToRemove++;
        chnl.messages.fetch()
        const messages = chnl.messages.cache.filter(m => member ? m.member === member : true);
        return chnl
            .bulkDelete(messages.array().slice(0, Clamp(messagesToRemove, 1, 100)))
            .then(() => chnl.send(this.client.Success(`Bulk delete successful. Total messages removed: ${messages.size}`)))
            .then(sent => sent.delete({ timeout: this.client.Seconds(2.5) }))
    }
}