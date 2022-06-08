import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { ErrorLogger } from "../../Components/ErrorLogger";
import { EventErrorLogger } from "../../Events";
import Ripple from "../../Client";


export default class extends Command<Ripple> {
    public constructor() {
        const name = "errorlogs";
        super(name, {
            aliases: [name, "geterrorlogs", "errorlog", "errlogs", "errlog", "elogs", "elog"],
            description: "Returns a list of every error logged during current runtime.",
            ownerOnly: true
        });
    }

    public async exec(msg: Message) {
        const logger = new ErrorLogger(this.client.Logger.ErrorLogger, EventErrorLogger);
        let log: string = "";
        logger.Logged
            .forEach((err, date) => log += 
                `(${typeof err === "string"? err : err.message}) - (${date.toLocaleDateString()} | ${date.toLocaleTimeString()})\n`
            );

        return msg.reply(
            this.client.Embed("Error Logs")
                .setDescription(log === "" ? "Nothing logged yet." : log.slice(0, 1023))
        );
    }
}