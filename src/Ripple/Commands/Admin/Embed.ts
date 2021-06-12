import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "embed";
        super(name, {
            aliases: [name, "makeembed", "messageembed", "richembed"],
            cooldown: 5e3,
            ratelimit: 2,
            channel: "guild",
            description: {
                content: "Returns a prompt for a customizable embed.",
                usage: "<prompt: title> <prompt: description> <prompt: url> <prompt: author> <prompt: thumbnail> <prompt: image>"
            },
            args: [
                Arg("title", "string", undefined, {
                    start: "Would you like a title for your embed? If so, what would you like it to be?"
                }),
                Arg("description", "string", undefined, {
                    start: "Would you like a description for your embed? If so, what would you like it to be?"
                }),
                Arg("url", "string", undefined, {
                    start: "Would you like a URL for your embed? If so, provide a URL."
                }),
                Arg("author", "string", undefined, {
                    start: "Would you like an author for your embed? If so, what would you like it to be?"
                }),
                Arg("thumbnail", "string", undefined, {
                    start: "Would you like a thumbnail for your embed? If so, provide a URL."
                }),
                Arg("image", "string", undefined, {
                    start: "Would you like an image for your embed? If so, provide a URL."
                }),
                Arg("channel", "textChannel", undefined, {
                    start: "Would you like a channel for your embed to be sent in? If so, where would you like it to be? (If you say no it will send in this channel)",
                    retry: "That's an invalid text channel. Please try again."
                })
            ]
        });
    }

    public async exec(msg: Message, { 
        title,
        description,
        url,
        author,
        thumbnail,
        image,
        channel
    }: { 
        title: string;
        description: string;
        url: string;
        author: string;
        thumbnail: string;
        image: string;
        channel: TextChannel;
    }) {
        const embed = this.client.Embed();

        if (title.toLowerCase() !== "no")
            embed.setTitle(title);

        if (description.toLowerCase() !== "no")
            embed.setDescription(description);

        if (url.toLowerCase() !== "no")
            embed.setURL(url);

        if (author.toLowerCase() !== "no")
            embed.setAuthor(author);

        if (thumbnail.toLowerCase() !== "no")
            embed.setThumbnail(thumbnail);

        if (image.toLowerCase() !== "no")
            embed.setURL(image);

        return channel.send(embed)
            .then(() => msg.reply(
                this.client.Success(`Successfully sent embed in ${channel}!`)
            )) || 
            this.client.Logger.CouldNotBeExecutedError(msg, "Failed to send embed.");
    }
}