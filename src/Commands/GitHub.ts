import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class GitHub extends Command {
    public constructor() {
        const name = "github";
        super(name, {
            aliases: [name, "githubrepo", "repository"],
            description: "Returns Ripple's GitHub repository link.",
            category: "Info"
        });
    }

    public async exec(msg: Message) {
        return msg.reply(
            new MessageEmbed()
                .setTitle("GitHub")
                .setURL("https://github.com/AlphaRunic/Ripple")
                .setImage("https://opengraph.githubassets.com/97bd4d7cef5c31277bfbb577cc87e7f6e1f92f3ccb90ed6c14f55e2016d37bc7/AlphaRunic/Ripple")
                .setColor("RANDOM")
                .setTimestamp()
        );
    }
}