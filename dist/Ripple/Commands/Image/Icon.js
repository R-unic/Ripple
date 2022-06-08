"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "icon";
        super(name, {
            aliases: [name, "searchicons"],
            description: {
                content: "Returns an icon based on a search query.",
                usage: '<"query"> <pageNumber?>'
            },
            args: [
                (0, Util_1.Arg)("query", "string"),
                (0, Util_1.Arg)("pageNumber", "number", 1)
            ]
        });
    }
    exec(msg, { query, pageNumber }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                const raster = (0, Util_1.Last)(rasterSizes);
                const format = (0, Util_1.Last)(raster.formats);
                return msg.reply(this.client.Embed(`Icon Results for \`${query}\``)
                    .setAuthor(`Page ${pageNumber} of 10`)
                    .setDescription(`Tags: ${icon.tags.join(", ")}`)
                    .setThumbnail(format.preview_url)
                    .setURL(format.download_url));
            }).catch(err => this.client.Logger.APIError(msg, err));
        });
    }
}
exports.default = default_1;
