"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
const yt_search_1 = require("yt-search");
const ms_1 = tslib_1.__importDefault(require("ms"));
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "youtube";
        super(name, {
            aliases: [name, "yt", "youtubesearch", "ytsearch", "searchyoutube", "searchyt"],
            cooldown: 10e3,
            ratelimit: 2,
            description: {
                content: "Searches for a video on YouTube.",
                usage: '<"query">'
            },
            args: [
                (0, Util_1.Arg)("query", "string")
            ]
        });
    }
    exec(msg, { query }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!query)
                return this.client.Logger.MissingArgError(msg, "query");
            (0, yt_search_1.search)(query)
                .then(({ videos }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                let i = 0;
                const hasPremium = yield this.client.Premium.Has(msg.author);
                const titles = videos.map(r => {
                    i++;
                    if (hasPremium ? i > 20 : i > 10)
                        return;
                    return `**${i}**. ${r.title}`;
                });
                msg.channel.send(this.client.Embed("YouTube Search")
                    .setDescription("__Select the video you'd like by saying the number of the video below.__\n\n" + titles.join("\n").trim())
                    .setThumbnail("https://cdn-icons-png.flaticon.com/512/1384/1384060.png")
                    .setColor("#C4302B"));
                const f = m => msg.author.id === m.author.id && m.content <= videos.length;
                const collected = yield msg.channel.awaitMessages(f, { max: 1, time: (0, ms_1.default)("30s") });
                const numberContent = collected.first().content;
                const selected = videos[numberContent - 1];
                msg.channel.send(this.client.Embed(selected.title)
                    .setURL(selected.url)
                    .setThumbnail(selected.thumbnail)
                    .setAuthor(selected.author.name + " | " + (0, Util_1.CommaNumber)(selected.views) + " views | " + selected.timestamp, undefined, selected.author.url)
                    .setDescription(selected.description));
            })).catch(e => { var _a; return this.client.Logger.APIError(msg, (_a = e === null || e === void 0 ? void 0 : e.message) !== null && _a !== void 0 ? _a : e); });
        });
    }
}
exports.default = default_1;
