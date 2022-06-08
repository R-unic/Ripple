"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const PremiumCommand_1 = require("../../Components/CommandClasses/PremiumCommand");
const Util_1 = require("../../Util");
const PornHub = require("pornhub.js");
const ph = new PornHub();
class default_1 extends PremiumCommand_1.PremiumCommand {
    constructor() {
        const name = "pornhub";
        super(name, {
            aliases: [name, "pornhubsearch", "phsearch", "ph"],
            description: {
                content: "Returns a PornHub video based on your search query. **(Ripple Premium only)**",
                usage: '<"query">'
            },
            args: [(0, Util_1.Arg)("query", "string")]
        });
    }
    exec(msg, { query }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const error = yield this.DoesNotOwnPremium(msg);
            if (error)
                return error;
            if (!query)
                return this.client.Logger.MissingArgError(msg, "query");
            return ph.search("Video", query)
                .then(({ data }) => {
                const media = (0, Util_1.RandomElement)(data);
                const thumbnail = media.preview;
                return msg.reply(this.client.Embed(media.title)
                    .setURL(media.url)
                    .setThumbnail(thumbnail)
                    .setAuthor(`Length: ${media.duration}`)
                    .addField("HD", media.hd ? "Yes" : "No", true)
                    .addField("PH Premium", media.premium ? "Yes" : "No", true)
                    .setColor("E86F0C"));
            }).catch(err => this.client.Logger.APIError(msg, err));
        });
    }
}
exports.default = default_1;
