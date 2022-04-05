import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "embedsay";
        super(name, {
            aliases: [name, "esay", "embedwrap", "ewrap"],
            description: {
                content: "Repeats the message provided in the channel provided or the channel the command was execuetd in.",
                usage: '<"title"> <"message"> <channel?>'
            },
            args: [ 
                Arg("message", "string"),
                Arg("channel", "textChannel", msg => msg.channel)
            ]
        });
    }

    public async exec(msg: Message, { title, message, channel }: { title: string, message: string, channel: TextChannel }) {
        if (!title)
            this.client.Logger.MissingArgError(msg, "message");
        return message ? 
            channel.send(this.client.Embed(title, undefined, message)).then(() => msg.delete())
            :this.client.Logger.MissingArgError(msg, "message"); 
    }
}