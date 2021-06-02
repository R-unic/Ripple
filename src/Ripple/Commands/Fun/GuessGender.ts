import { APICommand } from "../../Components/CommandClasses/APICommand";
import { Message } from "discord.js";
import { Arg, ToTitleCase } from "../../Util";

export default class extends APICommand {
    public constructor() {
        const name = "guessgender";
        super(name, {
            aliases: [name, "genderize", "namegender"],
            description: {
                content: "Guesses your gender based on your name.",
                usage: '<"name">'
            },
            args: [ Arg("name", "string") ]
        });
    }

    public async exec(msg: Message, { name }: { name: string }) {
        if (!name)
            return this.client.Logger.MissingArgError(msg, "name");

        return this.RequestAPI<{ 
            name: string;
            gender: string | null;
            probability: number
        }>(msg, "https://api.genderize.io?name=" + encodeURIComponent(name))
            .then(({ name, gender, probability }) => msg.reply(
                    this.client.Embed()
                        .setAuthor(`Certainty: ${probability * 100}%`)
                        .setTitle(`♂️ ${ToTitleCase(name)} ♀️`)
                        .setDescription(gender ? ToTitleCase(gender) : "Could not guess gender.")
                )
            ).catch(err => this.client.Logger.APIError(msg, err));
    }
}