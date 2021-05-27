import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Ripple/Client";
import fetch from "node-fetch";
import { MessageEmbed } from "discord.js";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "joke";
        super(name, {
            aliases: [name, "randomjoke"],
            description: "Returns a random joke."
        });
    }

    public async exec(msg: Message) {
        return this.RequestAPI()
            .then((res: { category: string, joke: string, didError: boolean }) => {
                if(res.didError)
                    this.client.Logger.APIError(msg, "Please try again momentarily. This could be an API error.");

                return this.client.Embed()
                        .setTitle('Random Joke')
                        .setAuthor(res.category)
                        .setDescription(res.joke);
            }).then(embed => msg.reply(embed));
    }
        

    private async RequestAPI(): Promise<any> {
        return fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=political,racist,sexist&type=single")
            .then(response => response.json());
    }
}