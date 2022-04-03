import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg, CommaNumber } from "../../Util";
import { search} from "yt-search";
import Ripple from "../../Client";
import ms from "ms";

export default class extends Command<Ripple> {
    public constructor() {
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
                Arg("query", "string")
            ]
        });
    }

    public async exec(msg: Message, { query }: { query: string }) {
        if (!query)
            return this.client.Logger.MissingArgError(msg, "query");
       
        search(query)
            .then(async ({ videos }) => {
                let i = 0;
                const hasPremium = await this.client.Premium.Has(msg.author);
                const titles = videos.map(r => {
                    i++;
                    if (hasPremium ? i > 20 : i > 10) return;
                    return `**${i}**. ${r.title}`;
                });

                msg.channel.send(
                    this.client.Embed("YouTube Search")
                        .setDescription("__Select the video you'd like by saying the number of the video below.__\n\n" + titles.join("\n").trim())
                        .setThumbnail("https://cdn-icons-png.flaticon.com/512/1384/1384060.png")
                        .setColor("#C4302B")
                );

                const f = m => msg.author.id === m.author.id && m.content <= videos.length;
                const collected = await msg.channel.awaitMessages(f, { max: 1, time: ms("30s") });
                const numberContent = <number><unknown>collected.first().content;
                const selected = videos[numberContent - 1];
                msg.channel.send(
                    this.client.Embed(selected.title)
                        .setURL(selected.url)
                        .setThumbnail(selected.thumbnail)
                        .setAuthor(selected.author.name + " | " + CommaNumber(selected.views) + " views | " + selected.timestamp, undefined, selected.author.url)
                        .setDescription(selected.description)
                );
            }).catch(e => this.client.Logger.APIError(msg, e?.message ?? e));
    }
}