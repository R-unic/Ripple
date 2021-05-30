import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "poll";
        super(name, {
            aliases: [name, "newpoll"],
            cooldown: 5,
            description: {
                content: "Returns a poll with 2 reactions.",
                usage: '<"pollQuestion">'
            },
            args: [ Arg("pollQuestion", "string") ]
        });
    }

    public async exec(msg: Message, { pollQuestion }: { pollQuestion: string }) {
        if (!pollQuestion)
            return this.client.Logger.MissingArgError(msg, "pollQuestion");

        return msg.reply(
            this.client.Embed()
                .setTitle("Poll")
                .setDescription(pollQuestion + "?")
        )
            .then(sent => {
                sent.react("👍");
                return sent;
            })
            .then(sent => sent.react("👎"));
    }
}