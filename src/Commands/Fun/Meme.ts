import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Random } from "../../Ripple/Util";
import Ripple from "../../Ripple/Client";
import fetch from "node-fetch";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "meme";
        super(name, {
            aliases: [name, "randommeme"],
            description: "Returns a random meme."
        });
    }

    public async exec(msg: Message) {
        return this.RequestAPI<{
            data: { 
                children: { 
                    data: { 
                        title: string, 
                        url: string, 
                        ups: number, 
                        downs: number
                    } 
                }[]
            }
        }>().then(res => {
            const meme = Random(res.data.children).data;
            return msg.reply(
                this.client.Embed()
                    .setTitle('😂 Random Meme 😂')
                    .setAuthor(`👍 ${meme.ups} | 👎 ${meme.downs}`)
                    .setDescription(meme.title)
                    .setImage(meme.url)
            );
        }).catch(() => 
            this.client.Logger.APIError(msg, "Please try again momentarily. This could be an API error.")
        );
    }   

    private async RequestAPI<ResponseType>(): Promise<ResponseType> {
        return fetch("https://www.reddit.com/r/dankmemes/top.json?sort=top&t=day&limit=500")
            .then(response => response.json())
    }
}