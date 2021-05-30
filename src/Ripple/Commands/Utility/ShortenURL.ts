import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";
import fetch from "node-fetch";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "shortenurl";
        super(name, {
            aliases: [name, "urlshorten", "shortenlink"],
            description: {
                content: "Shortens the provided URL via shrtco.de",
                usage: '<"url">',
                examples: ['"https://alpharunic.github.io/Ripple/"']
            },
            args: [ Arg("url", "string") ]
        });
    }

    public async exec(msg: Message, { url }: { url: string }) {
        if (!url)
            return this.client.Logger.MissingArgError(msg, "url");

        const sent = await msg.reply("Shortening URL... this may take a while.");

        return this.RequestAPI<{ 
            ok: boolean,
            error?: string,
            result?: {
                short_link: string,
                full_short_link: string
            }
        }>(url).then(res => {
            if (!res.ok)
                return this.APIError(msg, res.error);

            return sent.delete()
                .then(() => msg.reply(
                    this.client.Embed()
                        .setTitle('Shortened URL')
                        .setDescription(`[${res.result?.short_link}](${res.result?.full_short_link})`)
                ));
        }).catch(err => this.APIError(msg, err));
    }

    private APIError(msg: Message, err?: any) {
        return this.client.Logger.APIError(msg, err ?? "Please try again momentarily. This could be an API error.");
    }

    private async RequestAPI<ResType>(url: string): Promise<ResType> {
        return fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
            .then(response => response.json());
    }
}