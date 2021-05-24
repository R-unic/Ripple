import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";
const { floor, random } = Math;

export default class extends Command {
    public constructor() {
        const name = "8ball";
        super(name, {
            aliases: [name, "eightball", "magic8", "fortune"],
            description: {
                content: "Consults the magic eight ball for a trustworthy answer.",
                usage: "<question?>"
            }
        });
    }

    public async exec(msg: Message) {
        const client = this.client as RippleClient;
        const answers = [
            "It is certain.",
            "It is decidedly so.",
            "Without a doubt.",
            "Yes - definitely.",
            "You may rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Outlook good.",
            "Yes.",
            "Signs point to yes.",
            "Reply hazy, try again.",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don't count on it.",
            "My reply is no.",
            "My sources say no.",
            "Outlook not so good.",
            "Very doubtful."
        ];

        return msg.channel.send(
            client.Embed(msg)
                .setTitle("🎱 Magic 8-Ball 🎱")
                .setDescription(answers[floor(random() * answers.length)])
        );
    }
}