"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "meme";
        super(name, {
            aliases: [name, "randommeme"],
            description: "Returns a random meme."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.RequestAPI().then(res => {
                const meme = (0, Util_1.RandomElement)(res.data.children).data;
                return msg.reply(this.client.Embed()
                    .setTitle('😂 Random Meme 😂')
                    .setAuthor(`👍 ${meme.ups} | 👎 ${meme.downs}`)
                    .setDescription(meme.title)
                    .setImage(meme.url));
            }).catch(() => this.client.Logger.APIError(msg, "Please try again momentarily. This could be an API error."));
        });
    }
    RequestAPI() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, node_fetch_1.default)("https://www.reddit.com/r/dankmemes/top.json?sort=top&t=day&limit=500")
                .then(response => response.json());
        });
    }
}
exports.default = default_1;
