import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Channel, Role } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "getlevelupchannel";
        super(name, {
            aliases: [name, "getlevelchannel", "currentlevelchannel", "getlvlchannel", "currentlvlchannel"],
            cooldown: 3e3,
            description: "Returns the channel that level up messages are sent in."
        });
    }

    public async exec(msg: Message) {
        const channelID = await this.client.LevelUpChannel.Get(msg);
        return msg.reply(
            this.client.Embed("Level Up Channel")
                .setDescription(`The current channel set for level up messages is: ${channelID ? Channel(channelID) : "None"}`)
        );
    }
}