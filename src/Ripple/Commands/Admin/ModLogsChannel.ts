import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "modlogschannel";
        super(name, {
            aliases: [name, "modlogchannel", "modloggingchannel", "moderatorlogschannel", "moderatorlogchannel", "modlogschnl", "modlogchnl"],
            userPermissions: "MANAGE_CHANNELS",
            clientPermissions: "MANAGE_CHANNELS",
            cooldown: 5e3,
            ratelimit: 2,
            description: {
                content: "Sets a channel for moderator logging messages to manifest in.",
                usage: "<@channel?>"
            },
            args: [ Arg("channel", "textChannel") ]
        });
    }

    public async exec(msg: Message, { channel }: { channel: TextChannel }) {
        if (!channel)
            return this.client.ModLogsChannel.Set(msg, null)
                .then(() => msg.reply(
                    this.client.Success("Successfully unbinded mod logging channel.")
                ));

        return this.client.ModLogsChannel.Set(msg, channel.id)
            .then(() => msg.reply(
                this.client.Success(`Successfully set moderator logging channel to ${channel}.`)
            )).catch(err => this.client.Logger.DatabaseError(msg, err));
    }
}