import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Ripple/Util";
import Ripple from "../../Ripple/Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "sudo";
        super(name, {
            aliases: [name, "say", "repeat", "echo"],
            description: {
                content: "Repeats the message provided.",
                usage: '<"message">'
            },
            args: [ Arg("message", "string") ]
        });
    }

    public async exec(msg: Message, { message }: { message: string }) {
        message ? 
            msg.channel.send(message) 
            : 
            this.client.Logger.MissingArgError(msg, "message");
            
        return msg.delete();
    }
}