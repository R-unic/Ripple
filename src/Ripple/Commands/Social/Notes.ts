import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { StripISO } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "notes";
        super(name, {
            aliases: [name, "mynotes", "notepad"],
            cooldown: 3e3,
            description: "Returns a list of your notes."
        });
    }

    public async exec(msg: Message) {
        return this.client.Notes.Get(msg.member)
            .then(async notes => {
                const embed = this.client.Embed("Notepad");
                if (notes.length === 0)
                    embed.setDescription("No notes recorded.");
                else
                    notes.forEach(note => 
                        embed.addField(`${note.Title} (Recorded on ${StripISO(note.Timestamp)})`, note.Content.slice(0, 1023), true));

                return msg.reply(embed);
            });
    }
}