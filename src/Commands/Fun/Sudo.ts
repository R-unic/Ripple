import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "sudo";
        super(name, {
            aliases: [name, "say", "repeat", "echo"],
            description: {
                content: "Repeats the message provided.",
                usage: '<"message">'
            },
            args: [
                {
                    id: "message",
                    type: "string"
                }
            ]
        });
    }

    public async exec(msg: Message, { message }: { message: string }) {
        const client = this.client as RippleClient;

        message ? 
            msg.channel.send(message) 
            : 
            client.Logger.MissingArgError(msg, "message");
            
        return msg.delete();
    }
}