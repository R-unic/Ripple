import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "commandchannel";
        super(name, {
            aliases: [name, "cmdchannel", "cmdchnl", "commandschannel", "cmdschannel", "cmdschnl"],
            userPermissions: "MANAGE_CHANNELS",
            clientPermissions: "MANAGE_CHANNELS",
            cooldown: 5e3,
            ratelimit: 2,
            description: {
                content: "Sets a channel for commands to be enabled in, disabled everywhere else.",
                usage: "<@channel?>"
            },
            args: [ Arg("channel", "textChannel") ]
        });
    }

    public async exec(msg: Message, { channel }: { channel: TextChannel }) {
        if (!channel)
            return this.client.CommandChannel.Set(msg, null)
                .then(() => msg.reply(
                    this.client.Success("Successfully unbinded command channel.")
                )).catch(err => this.client.Logger.DatabaseError(msg, err));

        return this.client.CommandChannel.Set(msg, channel.id)
            .then(() => msg.reply(
                this.client.Success(`Successfully binded command channel to ${channel}.`)
            )).catch(err => this.client.Logger.DatabaseError(msg, err));
    }
}