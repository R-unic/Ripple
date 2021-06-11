import { Inhibitor } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../Client";

export class CommandChannelInhibitor extends Inhibitor<Ripple> {
    public constructor() {
        super('commandChannel', {
            reason: 'commandChannel'
        });
    }

    public async exec(msg: Message) {        
        const commandChannelID = await this.client.CommandChannel.Get(msg);
        const commandChannel = msg.guild.channels.resolve(commandChannelID);
                
        if (!commandChannel)
            return false;
        else if (commandChannel !== undefined && commandChannel !== null && msg.channel === commandChannel)
            return false;
        else if (commandChannel !== undefined && commandChannel !== null && msg.channel !== commandChannel)
            return true;
    }
}