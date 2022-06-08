"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "github";
        super(name, {
            aliases: [name, "githubrepo", "repository"],
            description: "Returns Ripple's GitHub repository link."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return msg.reply(this.client.Embed()
                .setTitle("GitHub")
                .setURL("https://github.com/AlphaRunic/Ripple")
                .setThumbnail("https://opengraph.githubassets.com/97bd4d7cef5c31277bfbb577cc87e7f6e1f92f3ccb90ed6c14f55e2016d37bc7/AlphaRunic/Ripple"));
        });
    }
}
exports.default = default_1;
