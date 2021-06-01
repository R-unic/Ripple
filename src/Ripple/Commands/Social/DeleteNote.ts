import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "deletenote";
        super(name, {
            aliases: [name, "removenote", "remnote", "delnote"],
            cooldown: 5e3,
            description: {
                content: "Removes a note from your notepad.",
                usage: '<"title">'
            },
            args: [ Arg("title", "string") ]
        });
    }

    public async exec(msg: Message, { title }: { title: string }) {
        if (!title)
            return this.client.Logger.MissingArgError(msg, "title");

        return this.client.Notes.Remove(msg.member, title)
            .then(() => msg.reply(
                this.client.Success(`Successfully removed note titled "${title}"`)
            ));
    }
}