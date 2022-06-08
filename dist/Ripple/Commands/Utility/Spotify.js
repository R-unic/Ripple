"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
const ms_1 = tslib_1.__importDefault(require("ms"));
const format_duration_1 = tslib_1.__importDefault(require("format-duration"));
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "spotify";
        super(name, {
            aliases: [name, "spotifysearch", "searchspotify", "spotifysongs"],
            cooldown: 10e3,
            ratelimit: 2,
            description: {
                content: "Searches for a track on Spotify.",
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
            const hasPremium = this.client.Premium.Has(msg.author);
            this.client.Spotify.searchTracks(query, { limit: hasPremium ? 20 : 10 })
                .then(({ tracks }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                let i = 0;
                const songs = tracks.items.map(t => {
                    i++;
                    return `${i}. ${t.artists.map(a => a.name).join(", ")} - ${t.name} [${(0, format_duration_1.default)(t.duration_ms)}]`;
                });
                msg.channel.send(this.client.Embed("Spotify Search")
                    .setDescription("__Select the song you'd like by saying the number of the song below.__\n\n" + songs.join("\n").trim())
                    .setThumbnail("https://cdn-icons-png.flaticon.com/512/2111/2111624.png")
                    .setColor("#1DB954"));
                const f = m => msg.author.id === m.author.id && m.content <= songs.length;
                const collected = yield msg.channel.awaitMessages(f, { max: 1, time: (0, ms_1.default)("30s") });
                const numberContent = collected.first().content;
                const selected = tracks.items[numberContent - 1];
                msg.channel.send(this.client.Embed(selected.name)
                    .setURL(selected.uri)
                    .setThumbnail(selected.preview_url)
                    .setAuthor(selected.artists.map(a => a.name).join(", "))
                    .setDescription(`${(0, Util_1.CommaNumber)(selected.popularity)} streams | ${selected.explicit ? "Explicit" : "Not explicit"}`));
            })).catch(e => {
                var _a;
                console.log(e);
                this.client.Logger.APIError(msg, (_a = e === null || e === void 0 ? void 0 : e.message) !== null && _a !== void 0 ? _a : e);
            });
        });
    }
}
exports.default = default_1;
