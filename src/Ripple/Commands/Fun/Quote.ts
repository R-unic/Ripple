import { APICommand } from "../../Components/CommandClasses/APICommand";
import { Message } from "discord.js";

export default class extends APICommand {
    public constructor() {
        const name = "quote";
        super(name, {
            aliases: [name, "motivationalquote", "randomquote"],
            description: "Returns a random quote."
        });
    }

    public async exec(msg: Message) {
        return this.RequestAPI<{ 
            tags: string[], 
            content: string, 
            author: string 
        }>(msg, "http://api.quotable.io/random")
            .then(res =>  msg.reply(
                    this.client.QuoteEmbed("Random Quote", "📢")
                        .setQuote(res.content, res.author)
                )
            ).catch(err => this.client.Logger.APIError(msg, err));
    }
}