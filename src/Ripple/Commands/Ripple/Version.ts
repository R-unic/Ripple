import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "version";
        super(name, {
            aliases: [name, "rippleversion", "ripplevsn", "vsn"],
            description: "Returns information about Ripple."
        });
    }

    public async exec(msg: Message) {
        return msg.reply(
            this.client.Embed(`Ripple v${this.client.Package.version}`)
        );
    }
}