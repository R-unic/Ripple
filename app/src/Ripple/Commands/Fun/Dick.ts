import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { RandomInt } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "dick";
        super(name, {
            aliases: [name, "cock", "penis", "pp", "chode", "weiner", "dicksize", "ppsize"],
            description: "Returns a random-sized cock (not real)."
        });
    }

    public async exec(msg: Message) {
        const cockSize = RandomInt(18);
        const balls = "8";
        const shaft = "=".repeat(cockSize);
        const head = "D";
        const cock = balls + shaft + head;
        return msg.reply(
            this.client.Embed("Dick")
                .setAuthor(`${cockSize} inch(es)`)
                .setDescription(cock)
        );
    }
}