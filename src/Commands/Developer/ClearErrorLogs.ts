import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Ripple/Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "clearerrorlogs";
        super(name, {
            aliases: [name, "clearerrorlog", "clearerrlogs", "clearerrlog", "clearerrs"],
            description: "Clears the collection of errors stored during runtime.",
            ownerOnly: true
        });
    }

    public async exec(msg: Message) {
        const beforeSize = this.client.Logger.ErrorCount;
        this.client.Logger.Clear();

        return msg.reply(
            this.client.Success(`Successfully cleared ${beforeSize} error(s) from the internal runtime error log.`)
        );
    }
}