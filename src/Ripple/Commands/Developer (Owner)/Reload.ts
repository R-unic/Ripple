import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "reload";
        super(name, {
            aliases: [name, "reloadbot", "restart", "restartbot", "rl", "rs"],
            description: "Reloads Ripple's commands.",
            ownerOnly: true
        });
    }

    public async exec(msg: Message) {    
        for (const category of this.client.CommandHandler.categories)
            for (const [_, cmd] of category[1])
                cmd.reload();

        return msg.reply(
            this.client.Success("Successfully reloaded all of Ripple's commands.")
        ).catch(e => this.client.Logger.APIError(msg, e?.message?? e));
    }
}