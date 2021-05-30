import { APICommand } from "../../Components/CommandClasses/APICommand";
import { Message } from "discord.js";

export default class extends APICommand {
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
        }>(msg, "https://catfact.ninja/fact")
            .then(({ fact }) => msg.reply(
                this.client.Embed("🐱 Cat Fact 🐱")
                    .setDescription(fact)
            )).catch(err => 
                this.client.Logger.APIError(msg, err?? "Please try again momentarily. This could be an API error.")
            );
    }
}