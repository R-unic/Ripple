"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "feedback";
        super(name, {
            aliases: [name, "submitfeedback", "givefeedback", "suggestion", "suggest", "fb"],
            description: {
                content: "Sends feedback to the #feedback channel in the Ripple server.",
                usage: '<"feedback">'
            },
            args: [(0, Util_1.Arg)("feedback", "string")]
        });
    }
    exec(msg, { feedback }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return !feedback ?
                this.client.Logger.MissingArgError(msg, "feedback")
                : this.client.guilds.fetch("846604279288168468")
                    .then(guild => guild.channels.cache.find(channel => channel.id === "846605592054857728")).then((feedbackChannel) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return feedbackChannel.send(this.client.Embed()
                        .setTitle(`${msg.author.username} Says`)
                        .setDescription(feedback)
                        .setThumbnail(feedbackChannel.guild.iconURL({ dynamic: true }))
                        .addField("Server", `${msg.guild.name} | [Invite](${(yield msg.guild.fetchInvites()).first()})`));
                })).then(() => {
                    msg.delete();
                    return msg.reply("Successfully sent feedback!");
                });
        });
    }
}
exports.default = default_1;
