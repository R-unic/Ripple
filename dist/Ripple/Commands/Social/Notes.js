"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "notes";
        super(name, {
            aliases: [name, "mynotes", "notepad"],
            cooldown: 3e3,
            description: "Returns a list of your notes."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.client.Notes.Has(msg.author)
                .then((notes) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const embed = this.client.Embed("Notepad");
                if (notes.length === 0)
                    embed.setDescription("No notes recorded.");
                else
                    notes.forEach(note => embed.addField(`${note.Title} (Recorded on ${(0, Util_1.StripISO)(note.Timestamp)})`, note.Content.slice(0, 1023), true));
                return msg.reply(embed);
            }));
        });
    }
}
exports.default = default_1;
