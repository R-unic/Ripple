import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg, ToTitleCase } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "color";
        super(name, {
            aliases: [name, "hexcolor"],
            description: {
                content: "Returns an embed with the color provided, or a random color.",
                usage: '<"color?">'
            },
            args: [ Arg("color", "uppercase", "RANDOM") ]
        });
    }

    public async exec(msg: Message, { color }: { color: string }) {
        if (!color)
            return this.client.Logger.MissingArgError(msg, "color");

        return msg.reply(
            this.client.Embed(ToTitleCase(color.trim()))
                .setColor(color.trim().split(" ").join("_"))
        );
    }
}