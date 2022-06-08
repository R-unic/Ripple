"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
const NotesManager_1 = require("../../Components/DataManagement/Managers/User/NotesManager");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "note";
        super(name, {
            aliases: [name, "takenote", "recordnote", "addnote", "newnote"],
            cooldown: 10e3,
            description: {
                content: "Records a note in your notepad.",
                usage: '<"title"> <"content">'
            },
            args: [
                (0, Util_1.Arg)("title", "string"),
                (0, Util_1.Arg)("content", "string")
            ]
        });
    }
    exec(msg, { title, content }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!title)
                return this.client.Logger.MissingArgError(msg, "title");
            if (!content)
                return this.client.Logger.MissingArgError(msg, "content");
            return this.client.Notes.Add(msg.author, new NotesManager_1.Note(title, content, new Date(Date.now())))
                .then(() => msg.reply(this.client.Success(`Successfully created a new note with title "${title}".`)));
        });
    }
}
exports.default = default_1;
