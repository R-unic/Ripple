import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import { Note } from "../../Components/DataManagement/Managers/User/NotesManager";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "note";
        super(name, {
            aliases: [name, "takenote", "recordnote", "addnote", "newnote"],
            cooldown: 10e3,
            description: {
                content: "Records a note in your notepad.",
                usage: '<"title"> <"content">'
            },
            args: [ 
                Arg("title", "string"),
                Arg("content", "string")
            ]
        });
    }

    public async exec(msg: Message, { title, content }: { title: string, content: string }) {
        if (!title)
            return this.client.Logger.MissingArgError(msg, "title");

        if (!content)
            return this.client.Logger.MissingArgError(msg, "content");

        return this.client.Notes.Add(msg.author, new Note(title, content, new Date(Date.now())))
            .then(() => msg.reply(
                this.client.Success(`Successfully created a new note with title "${title}".`)
            ));
    }
}