import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg, StripISO } from "../../Util";
import Ripple from "../../Client";
import fetch from "node-fetch";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "wikipedia";
        super(name, {
            aliases: [name, "wiki"],
            description: {
                content: "Returns a Wikipedia article for the given query.",
                usage: '<"query">',
                examples: ['"sugar gliders"']
            },
            args: [ Arg("query", "string") ]
        });
    }

    public async exec(msg: Message, { query }: { query: string }) {
        if (!query)
            return this.client.Logger.MissingArgError(msg, "query");

        return this.RequestAPI<{ 
            displaytitle: string,
            titles: {
                canonical: string,
                normalized: string,
                display: string
            },
            thumbnail?: {
                source: string
            },
            originalimage?: {
                source: string
            },
            timestamp: string,
            description: string,
            content_urls: {
                desktop: {
                    page: string
                }
            },
            extract: string
        }>(query).then(res => res ? msg.reply(
            this.client.Embed()
                .setTitle(res.titles.display)
                .setAuthor(StripISO(res.timestamp))
                .setURL(res.content_urls.desktop.page)
                .setThumbnail(res.thumbnail?.source ?? res.originalimage?.source ?? res.content_urls.desktop.page)
                .setDescription(res.extract)
        ) : this.APIError(msg, "No results found.")).catch(err => this.APIError(msg, err));
    }

    private APIError(msg: Message, err?: any) {
        return this.client.Logger.APIError(msg, err ?? "Please try again momentarily. This could be an API error.");
    }

    private async RequestAPI<ResType>(query: string): Promise<ResType> {
        return fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
            .then(response => response.json());
    }
}