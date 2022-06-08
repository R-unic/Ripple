"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "reportbug";
        super(name, {
            aliases: [name, "bugreport", "bug"],
            description: {
                content: "Sends a bug report to the #bugs channel in the Ripple server.",
                usage: '<"bug">'
            },
            args: [
                {
                    id: "bug",
                    type: "string"
                }
            ]
        });
    }
    exec(msg, { bug }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return !bug ?
                this.client.Logger.MissingArgError(msg, "bug")
                : this.client.guilds.fetch("846604279288168468")
                    .then(guild => {
                    return guild.channels.cache.find(channel => channel.id === "846613726332321813");
                })
                    .then((bugsChannel) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    bugsChannel.send("<@415233686758359051>");
                    bugsChannel.send(this.client.Embed()
                        .setTitle(`Bug Report from: ${msg.author.username}`)
                        .setDescription(bug)
                        .setThumbnail(bugsChannel.guild.iconURL({ dynamic: true }))
                        .addField("Server", `${msg.guild.name} | [Invite](${(yield msg.guild.fetchInvites()).first()})`));
                }))
                    .then(() => {
                    msg.delete();
                    return msg.reply(this.client.Success("Successfully sent bug report!"));
                });
        });
    }
}
exports.default = default_1;
