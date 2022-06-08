import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";
import axios from "axios";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "urbandictionary";
        super(name, {
            aliases: [name, "urbandict", "urban"],
            description: {
                content: "Looks up a phrase on Urban Dictionary.",
                usage: '<"phrase"> <resultNumber?>'
            },
            args: [
                Arg("phrase", "string"),
                Arg("resultNumber", "number", 0)
            ]
        });
    }

    public async exec(msg: Message, { phrase, resultNumber }: { phrase: string, resultNumber: number}) {
        if (!phrase)
            return this.client.Logger.MissingArgError(msg, "phrase");

        if (resultNumber !== 0)
            resultNumber--;

        const base = "http://api.urbandictionary.com/v0/define?term=";
        const url = base + phrase.split(" ").join("+");

        return axios.get(url)
            .then(res => {
                const result = res.data.list[resultNumber];
                if (result)
                    return this.client.Embed()
                        .setTitle(`"${result.word}"`)
                        .setAuthor(`Author: ${result.author}`)
                        .addField(`Definition (${resultNumber + 1} of ${res.data.list.length})`, result.definition.slice(1, 1020))
                        .addField("Example", result.example.slice(1, 1020))
                        .setURL(result.permalink);
                else
                    return "No entry found.";
            })
            .then(out => msg.reply(out));
    }
}