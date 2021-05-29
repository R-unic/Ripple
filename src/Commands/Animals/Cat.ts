import { APICommand } from "../../Ripple/Components/CommandClasses/APICommand";
import { Message } from "discord.js";
import { StripISO } from "../../Ripple/Util";

export default class extends APICommand {
    public constructor() {
        const name = "cat";
        super(name, {
            aliases: [name, "kittycat", "kitten", "kitty", "meow"],
            description: "Returns a picture of a cat."
        });
    }

    public async exec(msg: Message) {
        const baseURL = "https://cataas.com";

        return this.RequestAPI<{ 
            img: string, 
            date: string 
        }>(msg, baseURL + "/cat?json=true")
            .then(({ date, img }) => msg.reply(
                this.client.Embed()
                    .setTitle('🐱 Meow! 🐱')
                    .setAuthor(StripISO(date))
                    .setImage(baseURL + img)
            ));
    }
}