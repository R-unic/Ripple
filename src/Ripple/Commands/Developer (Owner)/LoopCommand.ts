import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";
import ms from "ms";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "loopcommand";
        super(name, {
            aliases: [name, "commandloop", "periodcommand"],
            ownerOnly: true,
            description: {
                content: "Loops a command for a given time period.",
                usage: '<command> <period>',
                examples: ['randomgif 1h', 'errlogs 1day']
            },
            args: [ 
                Arg("command", "commandAlias"),
                Arg("period", "string")
            ]
        });
    }

    public async exec(msg: Message, { command, period }: { command: Command<Ripple>, period: string }) {
        if (!command)
            return this.client.Logger.MissingArgError(msg, "command");

        if (!period)
            return this.client.Logger.MissingArgError(msg, "period");

        const periodMS = ms(period);
        this.client.CancelCommandLoop = false;
        const Execute = async (): Promise<any> => {
            if (this.client.CancelCommandLoop) return;
            const p = await command.exec(msg, undefined);
            setTimeout(Execute, periodMS);
            return p;
        }

        return msg.reply(
            this.client.Success(`Successfully set loop on \`${command.id}\` for ${period}`)
        ).then(Execute);
    }
}