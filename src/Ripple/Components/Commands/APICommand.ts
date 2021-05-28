import { Command } from "discord-akairo";
import { Message } from "discord.js";
import fetch from "node-fetch";
import Ripple from "../../Client";

export class APICommand extends Command<Ripple> {
    public async RequestAPI<ResType = any>(msg: Message, url: string, text: boolean = false): Promise<ResType> {
        try {
            return await fetch(url)
                .then(res => text ? res.text() : res.json()) as ResType;
        } catch (err) {
            this.client.Logger.APIError(msg);
        }
    }
}