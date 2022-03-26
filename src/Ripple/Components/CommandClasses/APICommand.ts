import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";
import fetch from "node-fetch";

export class APICommand extends Command<Ripple> {
    declare public ratelimit: 2;
    
    public async RequestAPI<ResType = any>(msg: Message, url: string, text: boolean = false): Promise<ResType> {
        try {
            return await fetch(url)
                .then(res => text ? res.text() : res.json()) as ResType;
        } catch (err) {
            this.client.Logger.APIError(msg);
        }
    }
}