import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg, Last } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "icon";
        super(name, {
            aliases: [name, "searchicons"],
            description: {
                content: "Returns an icon based on a search query.",
                usage: '<"query"> <pageNumber?>'
            },
            args: [
                Arg("query", "string"),
                Arg("pageNumber", "number", 1)
            ]
        });
    }

    public async exec(msg: Message, { query, pageNumber }: { query: string, pageNumber: number }) {
        if (!query)
            return this.client.Logger.MissingArgError(msg, "query");

        if (!pageNumber)
            return this.client.Logger.MissingArgError(msg, "pageNumber");

        if (pageNumber <= 0 || pageNumber > 10)
            return this.client.Logger.InvalidArgError(msg, "Page number must be between 1 and 10.");

        return this.client.IconFinder.QueryIcons(query)
            .then(({ icons, message }) => {
                if (message)
                    return this.client.Logger.APIError(msg, message);

                if (!icons || icons.length === 0)
                    return this.client.Logger.APIError(msg, "No results found.");

                const icon = icons[pageNumber - 1];
                const rasterSizes = icon.raster_sizes;
                const raster = Last(rasterSizes);
                const format = Last(raster.formats);
                
                return msg.reply(
                    this.client.Embed(`Icon Results for \`${query}\``)
                        .setAuthor(`Page ${pageNumber} of 10`)
                        .setDescription(`Tags: ${icon.tags.join(", ")}`)
                        .setThumbnail(format.preview_url)
                        .setURL(format.download_url)
                );
            }).catch(err => this.client.Logger.APIError(msg, err));
    }
}