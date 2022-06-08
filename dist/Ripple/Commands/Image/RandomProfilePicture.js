"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const APICommand_1 = require("../../Components/CommandClasses/APICommand");
const Util_1 = require("../../Util");
class default_1 extends APICommand_1.APICommand {
    constructor() {
        const name = "randomprofilepicture";
        super(name, {
            aliases: [name, "randomprofilepic", "randompfp", "randomavatar", "gifprofilepic", "gifpfp"],
            description: "Returns a random GIF."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const search = (0, Util_1.RandomElement)([
                "cute egirl",
                "lil uzi vert",
                "j cole",
                "juice wrld",
                "xxxtentacion",
                "ski mask the slump god",
                "money rapper",
                "trippy",
                "anime",
                "anime romance",
                "ynw melly",
                "lil mosey",
                "nle choppa"
            ]);
            return this.RequestAPI(msg, `https://g.tenor.com/v1/search?q=${encodeURIComponent(search)}&key=${process.env.TENOR_API}&limit=25`)
                .then(({ results }) => {
                var _a, _b;
                const media = (_a = (0, Util_1.RandomElement)((0, Util_1.RandomElement)(results).media)) !== null && _a !== void 0 ? _a : (0, Util_1.RandomElement)(results).media[0];
                const img = ((_b = media.mediumgif) !== null && _b !== void 0 ? _b : media.gif).url;
                return msg.reply(this.client.Embed("Random Profile Picture")
                    .setImage(img));
            }).catch(err => this.client.Logger.APIError(msg, err));
        });
    }
}
exports.default = default_1;
