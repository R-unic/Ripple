import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Ripple/Client";
import fetch from "node-fetch";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "quote";
        super(name, {
            aliases: [name, "motivationalquote", "randomquote"],
            description: "Returns a random quote."
        });
    }

    public async exec(msg: Message) {
        return this.requestAPI(msg)
            .then((res: { tags: string[], content: string, author: string }) => {
                return msg.reply(
                    this.client.Embed()
                        .setTitle('Random Quote')
                        .setAuthor(res.author)
                        .setDescription(`${res.content}\nTags: ${res.tags}`)
                );
            }).catch(() => 
                this.client.Logger.APIError(msg, "Please try again momentarily. This could be an API error.")
            );
    }

    private async requestAPI(msg: Message): Promise<any> {
        return fetch("http://api.quotable.io/random")
            .then(response => response.json());
    }
}