import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg, CommaNumber } from "../../Util";
import Ripple from "../../Client";
import ms from "ms";
import formatDuration from "format-duration";

export default class extends Command<Ripple> {
    public constructor() {
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
                Arg("query", "string")
            ]
        });
    }

    public async exec(msg: Message, { query }: { query: string }) {
        if (!query)
            return this.client.Logger.MissingArgError(msg, "query");
       
        const hasPremium = this.client.Premium.Has(msg.author);
        this.client.Spotify.searchTracks(query, { limit: hasPremium ? 20 : 10 })
            .then(async ({ tracks }) => {
                let i = 0;
                const songs = tracks.items.map(t => {
                    i++;
                    return `${i}. ${t.artists.map(a => a.name).join(", ")} - ${t.name} [${formatDuration(t.duration_ms)}]`;
                });

                msg.channel.send(
                    this.client.Embed("Spotify Search")
                        .setDescription("__Select the song you'd like by saying the number of the song below.__\n\n" + songs.join("\n").trim())
                        .setThumbnail("https://cdn-icons-png.flaticon.com/512/2111/2111624.png")
                        .setColor("#1DB954")
                );
                const f = m => msg.author.id === m.author.id && m.content <= songs.length;
                const collected = await msg.channel.awaitMessages(f, { max: 1, time: ms("30s") });
                const numberContent = <number><unknown>collected.first()!.content;
                const selected = tracks.items[numberContent - 1];
                msg.channel.send(
                    this.client.Embed(selected.name)
                        .setURL(selected.uri)
                        .setThumbnail(selected.preview_url)
                        .setAuthor(selected.artists.map(a => a.name).join(", "))
                        .setDescription(`${CommaNumber(selected.popularity)} streams | ${selected.explicit ? "Explicit" : "Not explicit"}`)
                );
            }).catch(e => {
                console.log(e);
                this.client.Logger.APIError(msg, e?.message ?? e);
            });
    }
}