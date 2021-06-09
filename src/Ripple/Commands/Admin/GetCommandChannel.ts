import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Channel, Role } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "getcommandchannel";
        super(name, {
            aliases: [name, "getcmdchannel", "currentcommandchannel", "currentcmdchannel"],
            cooldown: 3e3,
            ratelimit: 2,
            description: "Returns the channel that bot commands are restricted to, if any."
        });
    }

    public async exec(msg: Message) {
        const channelID = await this.client.CommandChannel.Get(msg);
        return msg.reply(
            this.client.Embed("Command Channel")
                .setDescription(`The current channel set for bot commands is: ${channelID ? Channel(channelID) : "None"}`)
        );
    }
}