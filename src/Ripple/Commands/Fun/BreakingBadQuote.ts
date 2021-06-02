import { APICommand } from "../../Components/CommandClasses/APICommand";
import { Message } from "discord.js";

export default class extends APICommand {
    public constructor() {
        const name = "breakingbadquote";
        super(name, {
            aliases: [name, "breakingbad", "bbquote"],
            description: "Returns a random *Breaking Bad* quote."
        });
    }

    public async exec(msg: Message) {
        return this.RequestAPI<[
            {
                quote: string;
                author: string;
            }
        ]>(msg, "https://breaking-bad-quotes.herokuapp.com/v1/quotes")
            .then(res =>  msg.reply(
                    this.client.Embed()
                        .setTitle('Breaking Bad Quote')
                        .setDescription(`*"${res[0].quote}*" -${res[0].author}`)
                )
            ).catch(err => this.client.Logger.APIError(msg, err));
    }
}