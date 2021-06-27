import { APICommand } from "../../Components/CommandClasses/APICommand";
import { Message } from "discord.js";
import { Arg, RandomElement } from "../../Util";

interface TenorMediaType {
    dims: number[];
    url: string;
    preview: string;
    duration: number;
}

interface TenorMedia {
    gif: TenorMediaType;
    mediumgif: TenorMediaType;
}

interface TenorGIF {
    media: TenorMedia[];
}

interface TenorResponse {
    results: TenorGIF[];
}

export default class extends APICommand {
    public constructor() {
        const name = "gif";
        super(name, {
            aliases: [name, "gifsearch", "searchgif", "searchtenor", "tenorsearch", "tenor"],
            description: {
                content: "Returns a GIF based on your search query.",
                usage: '<"query">'
            },
            args: [ Arg("query", "string") ]
        });
    }

    public async exec(msg: Message, { query }: { query: string }) {
        return this.RequestAPI<TenorResponse>(msg, `https://g.tenor.com/v1/search?q=${encodeURIComponent(query)}&key=${process.env.TENOR_API}&limit=30`)
            .then(({ results }) => {
                const media = RandomElement(RandomElement(results).media)?? RandomElement(results).media[0];
                const img = (media.mediumgif?? media.gif).url;
                return msg.reply(
                    this.client.Embed(`Results for \`${query}\``)
                        .setImage(img)
                )
            }).catch(err => this.client.Logger.APIError(msg, err));
    }
}