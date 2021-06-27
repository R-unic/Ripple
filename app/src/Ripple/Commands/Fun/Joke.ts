import { APICommand } from "../../Components/CommandClasses/APICommand";
import { Message } from "discord.js";

export default class extends APICommand {
    public constructor() {
        const name = "joke";
        super(name, {
            aliases: [name, "randomjoke"],
            description: "Returns a random joke."
        });
    }

    public async exec(msg: Message) {
        return this.RequestAPI<{ 
            category: string, 
            joke: string, 
            didError: boolean 
        }>(msg, "https://v2.jokeapi.dev/joke/Any?blacklistFlags=political,racist,sexist&type=single")
            .then(({ category, joke, didError }) => {
                if(didError)
                    this.client.Logger.APIError(msg);

                return msg.reply(
                    this.client.Embed("😂 Random Joke 😂")
                        .setAuthor(category)
                        .setDescription(joke)
                );
            });
    }
}