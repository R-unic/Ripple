"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "embed";
        super(name, {
            aliases: [name, "makeembed", "messageembed", "richembed"],
            cooldown: 5e3,
            ratelimit: 2,
            channel: "guild",
            description: {
                content: "Returns a prompt for a customizable embed.",
                usage: "<prompt: title> <prompt: description> <prompt: url> <prompt: author> <prompt: thumbnail> <prompt: image> <prompt: pingEveryone>"
            },
            args: [
                (0, Util_1.Arg)("title", "string", undefined, {
                    start: "Would you like a title for your embed? If so, what would you like it to be? If not, say 'no'."
                }),
                (0, Util_1.Arg)("description", "string", undefined, {
                    start: "Would you like a description for your embed? If so, what would you like it to be? If not, say 'no'."
                }),
                (0, Util_1.Arg)("url", "string", undefined, {
                    start: "Would you like a URL for your embed? If so, provide a URL. If not, say 'no'."
                }),
                (0, Util_1.Arg)("author", "string", undefined, {
                    start: "Would you like an author for your embed? If so, what would you like it to be? If not, say 'no'."
                }),
                (0, Util_1.Arg)("thumbnail", "string", undefined, {
                    start: "Would you like a thumbnail for your embed? If so, provide a URL. If not, say 'no'."
                }),
                (0, Util_1.Arg)("image", "string", undefined, {
                    start: "Would you like an image for your embed? If so, provide a URL. If not, say 'no'."
                }),
                (0, Util_1.Arg)("channel", "textChannel", undefined, {
                    start: "Where would you like your embed to be sent in? (Provide a text channel)",
                    retry: msg => this.client.Logger.InvalidArgError(msg, "That's an invalid text channel. Please try again.")
                }),
                (0, Util_1.Arg)("pingEveryone", "boolean", false, {
                    start: "Would you like to ping everyone in your embed's message? If so, say 'yes'. If not, say 'no'.",
                    retry: msg => this.client.Logger.InvalidArgError(msg, "Invalid input, answer was not: 'yes', 'no', 'true', or 'false'. Please try again.")
                }),
            ]
        });
    }
    exec(msg, { title, description, url, author, thumbnail, image, channel, pingEveryone }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            if (pingEveryone)
                channel.send("@everyone");
            return channel.send(embed)
                .then(() => msg.reply(this.client.Success(`Successfully sent embed ${pingEveryone ? "and pinged everyone " : ""}in ${channel}!`))) ||
                this.client.Logger.CouldNotBeExecutedError(msg, "Failed to send embed.");
        });
    }
}
exports.default = default_1;
