"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Shrtco_de_1 = require("../../APIWrappers/Shrtco.de");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "shortenurl";
        super(name, {
            aliases: [name, "urlshorten", "shortenlink"],
            cooldown: 5e3,
            ratelimit: 2,
            description: {
                content: "Shortens a URL via shrtco.de.",
                usage: '<url>',
                examples: ['https://alpharunic.github.io/Ripple/']
            },
            args: [(0, Util_1.Arg)("url", "string")]
        });
    }
    exec(msg, { url }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!url)
                return this.client.Logger.MissingArgError(msg, "url");
            const sent = yield msg.reply("Shortening URL... this may take a while.");
            const link = yield Shrtco_de_1.ShortcodeAPI.ShortenURL(url);
            if (!link)
                return this.client.Logger.APIError(msg, "Could not shorten URL.");
            return sent.delete()
                .then(() => msg.reply(this.client.Embed("Shortened URL", "🔗")
                .setDescription(link)));
        });
    }
}
exports.default = default_1;
