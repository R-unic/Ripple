import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "sudo";
        super(name, {
            aliases: [name, "say", "repeat", "echo"],
            description: {
                content: "Repeats the message provided in the channel provided or the channel the command was execuetd in.",
                usage: '<"message">'
            },
            args: [ 
                Arg("message", "string"),
                Arg("channel", "textChannel", msg => msg.channel)
            ]
        });
    }

    public async exec(msg: Message, { message, channel }: { message: string, channel: TextChannel }) {
        message ? 
            channel.send(message) 
            :this.client.Logger.MissingArgError(msg, "message");
            
        return msg.delete();
    }
}