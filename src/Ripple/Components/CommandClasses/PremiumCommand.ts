import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export class PremiumCommand extends Command<Ripple> {
    declare public ratelimit: 2;
     
    public async DoesNotOwnPremium(msg: Message): Promise<Message | boolean> {
        if (!(await this.client.Premium.Has(msg.member.user)))
            return this.client.Logger.NoPremiumError(msg);
    }
}