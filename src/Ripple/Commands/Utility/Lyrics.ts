import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import { requestLyricsFor, requestTitleFor, requestIconFor, requestAuthorFor } from "solenolyrics";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "lyrics";
        super(name, {
            aliases: [name, "songlyrics"],
            cooldown: 3e3,
            description: {
                content: "Returns the lyrics to a song.",
                usage: '<"song">' 
            },
            args: [ Arg("song", "string") ]
        });
    }

    public async exec(msg: Message, { song }: { song: string }) {
        return msg.reply("Fetching lyrics, this may take a while...")
            .then(async sent => {
                return {
                    sentMsg: sent,
                    lyricsMsg: await msg.reply(
                        this.client.Embed()
                            .setTitle(await requestTitleFor(song))
                            .setDescription((await requestLyricsFor(song))?.slice(0, 2042) ?? "Could not find lyrics")
                            .setAuthor(await requestAuthorFor(song))
                            .setThumbnail(await requestIconFor(song))
                    )
                }
            })
            .then(async ({ sentMsg, lyricsMsg }: { sentMsg: Message, lyricsMsg: Message }) => {
                await sentMsg.delete();
                return lyricsMsg;
            });
    }
}