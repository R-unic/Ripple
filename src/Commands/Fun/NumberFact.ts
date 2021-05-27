import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Ripple/Client";
import fetch from "node-fetch";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "numberfact";
        super(name, {
            aliases: [name, "randomnumberfact"],
            description: "Returns a random number fact."
        });
    }

    public async exec(msg: Message) {
        return this.RequestAPI<string>()
            .then(fact => {
                return msg.reply(
                    this.client.Embed()
                        .setTitle('Random Number Fact')
                        .setDescription(fact)
                );
            }).catch(() => 
                this.client.Logger.APIError(msg, "Please try again momentarily. This could be an API error.")
            );
    }

    private async RequestAPI<ResponseType>(): Promise<string | ResponseType> {
        return fetch("http://numbersapi.com/random/math")
            .then(response => response.text());
    }
}