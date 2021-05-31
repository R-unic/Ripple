import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";
import fetch from "node-fetch";

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

                return this.client.Embed("Random Joke")
                        .setAuthor(res.category)
                        .setDescription(res.joke);
            }).then(msg.reply);
    }
        

    private async RequestAPI(): Promise<any> {
        return fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=political,racist,sexist&type=single")
            .then(response => response.json());
    }
}