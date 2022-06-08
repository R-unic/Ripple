import { APICommand } from "../../Components/CommandClasses/APICommand";
import { Message } from "discord.js";

export default class extends APICommand {
    public constructor() {
        const name = "moviequote";
        super(name, {
            aliases: [name, "randommoviequote"],
            description: "Returns a random quote from a random movie."
        });
    }

    public async exec(msg: Message) {
        return this.RequestAPI<{
            quote: string;
            role: string;
            show: string;
        }>(msg, "https://movie-quote-api.herokuapp.com/v1/quote/")
            .then(({ quote, role, show }) =>  msg.reply(
                    this.client.QuoteEmbed(`Quote From \`${show}\``)
                        .SetQuote(quote, role)
                )
            ).catch(err => this.client.Logger.APIError(msg, err));
    }
}