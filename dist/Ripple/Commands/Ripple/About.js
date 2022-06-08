"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const discord_js_1 = require("discord.js");
const Util_1 = require("../../Util");
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "about";
        super(name, {
            aliases: [name, "rippleinfo", "aboutripple", "botinfo", "info"],
            description: "Returns information about Ripple."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return msg.reply(this.client.Embed("Ripple")
                .setDescription(`
                An open-source all-purpose Discord bot built with TypeScript.
                ${(0, Util_1.Hyperlink)(this.client.InviteLink, "Invite")} | ${(0, Util_1.Hyperlink)(this.client.Website, "Website")} | ${(0, Util_1.Hyperlink)(this.client.GitHubRepo, "GitHub Repository")}
                `)
                .setThumbnail(this.client.user.displayAvatarURL({ dynamic: true }))
                .addField("Developer", this.client.ownerID.map(Util_1.User).join(", "), true)
                .addField("Default Prefix", this.client.DefaultPrefix, true)
                .addField("Commands", this.client.CommandCount, true)
                .addField("Created On", (0, Util_1.StripISO)(this.client.user.createdAt), true)
                .addField("Version", this.client.Version, true)
                .addField("Library", `Discord.js v${discord_js_1.version}`, true)
                .addField("Language", "TypeScript 4.2.4", true)
                .addField("Compiled Environment", `Node ${process.version}`, true)
                .addField("Memory Usage", formatBytes(process.memoryUsage().heapTotal), true));
        });
    }
}
exports.default = default_1;
