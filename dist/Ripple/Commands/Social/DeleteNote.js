"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "deletenote";
        super(name, {
            aliases: [name, "removenote", "remnote", "delnote"],
            cooldown: 5e3,
            description: {
                content: "Removes a note from your notepad.",
                usage: '<"title">'
            },
            args: [(0, Util_1.Arg)("title", "string")]
        });
    }
    exec(msg, { title }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!title)
                return this.client.Logger.MissingArgError(msg, "title");
            return this.client.Notes.Remove(msg.author, title)
                .then(() => msg.reply(this.client.Success(`Successfully removed note titled "${title}"`)));
        });
    }
}
exports.default = default_1;
