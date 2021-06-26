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
                usage: '<command> <period> <"argsJSON">',
                examples: ['randomgif 1h', 'errlogs 1day', `say 7s "{ 'message': 'hello, world!' }"`]
            },
            args: [ 
                Arg("command", "commandAlias"),
                Arg("period", "string"),
                Arg("argsJSON", "string")
            ]
        });
    }

    public async exec(msg: Message, { command, period, argsJSON }: { command: Command<Ripple>, period: string, argsJSON?: string }) {        
        let json;
        try {
            json = argsJSON? 
                JSON.parse(
                    argsJSON
                        .split("'").join('"')
                ) : true;
        } catch (err) {
            return this.client.Logger.InvalidArgError(msg, "'argsJSON' could not be resolved to a JSON object.");
        }
            
        if (!command)
            return this.client.Logger.MissingArgError(msg, "command");

        if (!period)
            return this.client.Logger.MissingArgError(msg, "period");

        this.client.CancelCommandLoop = false;
        const periodMS = ms(period);
        if (!periodMS)
            return this.client.Logger.InvalidArgError(msg, "Argument 'period' provided is not an amount of time.");

        const Execute = async (): Promise<any> => {
            if (this.client.CancelCommandLoop) return;
            const p = await command.exec(msg, json === true ? undefined : json);
            setTimeout(Execute, periodMS);
            return p;
        }

        return msg.reply(
            this.client.Success(`Successfully set loop on \`${command.id}\` for ${period}`)
        ).then(Execute);
    }
}