import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";
import axios from "axios";

export default class extends Command {
    public constructor() {
        const name = "urbandictionary";
        super(name, {
            aliases: [name, "urbandict", "urban"],
            description: {
                content: "Looks up a phrase on Urban Dictionary",
                usage: '<"phrase"> <resultNumber?>'
            },
            args: [
                {
                    id: "phrase",
                    type: "string"
                },
                {
                    id: "resultNumber",
                    type: "number",
                    default: 0
                }
            ]
        });
    }

    public async exec(msg: Message, { phrase, resultNumber }: { phrase: string, resultNumber: number}) {
        const client = this.client as RippleClient;
        if (!phrase)
            return msg.reply("No phrase provided to look up.");

        if (resultNumber !== 0)
            resultNumber--;

        const base = "http://api.urbandictionary.com/v0/define?term=";
        const url = base + phrase.split(" ").join("+");

        return axios.get(url)
            .then(res => {
                const result = res.data.list[resultNumber];
                if (result)
                    return client.Embed()
                        .setTitle(`"${result.word}"`)
                        .setAuthor(`Author: ${result.author}`)
                        .addField(`Definition (${resultNumber + 1} of ${res.data.list.length})`, result.definition.slice(1, 1020))
                        .addField("Example", result.example.slice(1, 1020))
                        .setURL(result.permalink);
                else
                    return "No entry found.";
            })
            .then(out => msg.reply(out))
    }
}