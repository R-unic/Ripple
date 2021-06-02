import { APICommand } from "../../Components/CommandClasses/APICommand";
import { Message } from "discord.js";
import { Arg, ToTitleCase } from "../../Util";

export default class extends APICommand {
    public constructor() {
        const name = "guessage";
        super(name, {
            aliases: [name, "agify", "nameage"],
            description: {
                content: "Guesses your age based on your name and [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code.",
                usage: '<"name">, <"countryCode">'
            },
            args: [ 
                Arg("name", "string"),
                Arg("countryCode", "string") 
            ]
        });
    }

    public async exec(msg: Message, { name, countryCode }: { name: string, countryCode: string }) {
        if (!name)
            return this.client.Logger.MissingArgError(msg, "name");

        return this.RequestAPI<{ 
            name: string;
            gender: string | null;
            probability: number
        }>(msg, `https://api.agify.io?name=${encodeURIComponent(name)}&country_id=${countryCode.split(" ").join("")}`)
            .then(({ name, gender, probability }) => msg.reply(
                    this.client.Embed()
                        .setAuthor(`Certainty: ${probability * 100}%`)
                        .setTitle(`👧 ${ToTitleCase(name)} 👩`)
                        .setDescription(gender ? ToTitleCase(gender) : "Could not guess age.")
                )
            ).catch(err => this.client.Logger.APIError(msg, err));
    }
}