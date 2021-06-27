import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "levelupchannel";
        super(name, {
            aliases: [name, "setlevelupchannel", "setlevelchannel", "levelchannel", "setlvlchannel", "lvlchannel"],
            userPermissions: "MANAGE_CHANNELS",
            clientPermissions: "MANAGE_CHANNELS",
            cooldown: 5e3,
            ratelimit: 2,
            description: {
                content: "Sets a channel for level up messages to manifest in.",
                usage: "<@channel?>"
            },
            args: [ Arg("channel", "textChannel") ]
        });
    }

    public async exec(msg: Message, { channel }: { channel: TextChannel }) {
        if (!channel) {
            await this.client.LevelUpChannel.Set(msg, null);
            return msg.reply(
                this.client.Success("Successfully unbinded level up channel.")
            );
        }

        return this.client.LevelUpChannel.Set(msg, channel.id)
            .then(() => msg.reply(
                this.client.Success(`Successfully set level up channel to ${channel}.`)
            )).catch(err => this.client.Logger.DatabaseError(msg, err));
    }
}