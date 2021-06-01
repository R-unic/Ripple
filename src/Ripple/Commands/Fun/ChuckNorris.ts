import { APICommand } from "../../Components/CommandClasses/APICommand";
import { Message } from "discord.js";

export default class extends APICommand {
    public constructor() {
        const name = "chucknorris";
        super(name, {
            aliases: [name, "chucknorrisjoke", "norrisjoke", "norris"],
            description: "Returns a random Chuck Norris themed joke."
        });
    }

    public async exec(msg: Message) {
        return this.RequestAPI<{ 
            icon_url: string,
            value: string
        }>(msg, "https://api.chucknorris.io/jokes/random")
            .then(({ icon_url, value }) => msg.reply(
                    this.client.Embed()
                        .setTitle("😂 Chuck Norris Joke 😂")
                        .setThumbnail(icon_url)
                        .setDescription(value)
                )
            ).catch(err => this.client.Logger.APIError(msg, err));
    }
}