import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "stopcommandlooping";
        super(name, {
            aliases: [name, "stopcommandloops", "disablecommandloop", "unloopcommands", "stopcommandloop", "unloopcommand"],
            description: "Loops a command for a given time period.",
            ownerOnly: true
        });
    }

    public async exec(msg: Message) {
        this.client.CancelCommandLoop = true;
        return msg.reply(
            this.client.Success("Successfully stopped all command loops.")
        );
    }
}