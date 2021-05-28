import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Ripple/Client";
import fetch from "node-fetch";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "catfact";
        super(name, {
            aliases: [name, "randomcatfact", "catfacts"],
            description: "Returns a random cat fact."
        });
    }

    public async exec(msg: Message) {
        return this.RequestAPI<{
            fact: string
        }>().then(({ fact }) => msg.reply(
            this.client.Embed("🐱 Cat Fact 🐱")
                .setDescription(fact)
        )).catch(err => 
            this.client.Logger.APIError(msg, err?? "Please try again momentarily. This could be an API error.")
        );
    }   

    private async RequestAPI<ResponseType = any>(): Promise<ResponseType> {
        return fetch("https://catfact.ninja/fact")
            .then(res => res.json());
    }
}