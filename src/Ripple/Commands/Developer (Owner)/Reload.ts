import { exec } from "child_process";
import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "reload";
        super(name, {
            aliases: [name, "reloadbot", "restart", "restartbot", "rl", "rs"],
            description: "Reloads Ripple and it's commands",
            ownerOnly: true
        });
    }

    public async exec(msg: Message) {    
        exec("npm restart", e => this.client.Logger.APIError(msg, `${e.message}\n${e.stack?.slice(0, 2042)}`));
        return msg.reply(
            this.client.Success("Successfully reloaded Ripple. Command Count: " + this.client.CommandCount)
        );
    }
}