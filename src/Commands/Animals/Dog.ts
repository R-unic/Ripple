import { APICommand } from "../../Ripple/Components/CommandClasses/APICommand";
import { Message } from "discord.js";

export default class extends APICommand {
    public constructor() {
        const name = "dog";
        super(name, {
            aliases: [name, "dogpicture", "dogpic", "puppy", "pooch"],
            description: "Returns a picture of a dog."
        });
    }

    public async exec(msg: Message) {
        return this.RequestAPI<{ 
            message: string 
        }>(msg, "https://dog.ceo/api/breeds/image/random")
            .then(({ message }) => msg.reply(
                this.client.Embed()
                    .setTitle('🐶 Woof! 🐶')
                    .setImage(message)
            ));
    }
}