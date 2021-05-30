import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "errorlogs";
        super(name, {
            aliases: [name, "geterrorlogs", "errorlog", "errlogs", "errlog"],
            description: "Returns a list of every error logged during current runtime.",
            ownerOnly: true
        });
    }

    public async exec(msg: Message) {
        let log: string = "";
        this.client.Logger.Collection
            .forEach((err, date) => log += 
                `(${typeof err === "string"? err : err.message}) - (${date.toLocaleDateString()} | ${date.toLocaleTimeString()})\n`
            );

        return msg.reply(
            this.client.Embed("Error Logs")
                .setDescription(log === "" ? "Nothing logged yet." : log.slice(0, 1020))
        );
    }
}