"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
const solenolyrics_1 = require("solenolyrics");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "lyrics";
        super(name, {
            aliases: [name, "songlyrics"],
            cooldown: 3e3,
            description: {
                content: "Returns the lyrics to a song.",
                usage: '<"song">'
            },
            args: [(0, Util_1.Arg)("song", "string")]
        });
    }
    exec(msg, { song }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return msg.reply(this.client.Pending("Fetching lyrics, this may take a while..."))
                .then((old) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const sent = yield old.delete().then(() => msg.channel.send("Loading..."));
                return {
                    sentMsg: sent,
                    lyricsMsg: yield msg.reply(this.client.Embed()
                        .setTitle(yield (0, solenolyrics_1.requestTitleFor)(song))
                        .setDescription((_b = (_a = (yield (0, solenolyrics_1.requestLyricsFor)(song))) === null || _a === void 0 ? void 0 : _a.slice(0, 2042)) !== null && _b !== void 0 ? _b : "Could not find lyrics")
                        .setAuthor(yield (0, solenolyrics_1.requestAuthorFor)(song))
                        .setThumbnail(yield (0, solenolyrics_1.requestIconFor)(song)))
                };
            }))
                .then(({ sentMsg, lyricsMsg }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield sentMsg.delete();
                return lyricsMsg;
            }));
        });
    }
}
exports.default = default_1;
