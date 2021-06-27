import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { ShortcodeAPI } from "../../APIWrappers/Shrtco.de";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "shortenurl";
        super(name, {
            aliases: [name, "urlshorten", "shortenlink"],
            cooldown: 5e3,
            ratelimit: 2,
            description: {
                content: "Shortens a URL via shrtco.de",
                usage: '<url>',
                examples: ['https://alpharunic.github.io/Ripple/']
            },
            args: [ Arg("url", "string") ]
        });
    }

    public async exec(msg: Message, { url }: { url: string }) {
        if (!url)
            return this.client.Logger.MissingArgError(msg, "url");

        const sent = await msg.reply("Shortening URL... this may take a while.");
        const link = await ShortcodeAPI.ShortenURL(url);
        if (!link)
            return this.client.Logger.APIError(msg, "Could not shorten URL.");
        
        return sent.delete()
            .then(() => msg.reply(
                this.client.Embed("Shortened URL", "🔗")
                    .setDescription(link)
            ));
    }
}