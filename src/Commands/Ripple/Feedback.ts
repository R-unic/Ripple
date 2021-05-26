import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "feedback";
        super(name, {
            aliases: [name, "submitfeedback", "givefeedback", "fb"],
            description: {
                content: "Sends feedback to the #feedback channel in the Ripple server.",
                usage: '<"feedback">'
            },
            args: [
                {
                    id: "feedback",
                    type: "string"
                }
            ]
        });
    }

    public async exec(msg: Message, { feedback }: { feedback: string }) {
        const client = this.client as RippleClient;

        return !feedback?
            client.Logger.MissingArgError(msg, "feedback")
            :
            client.guilds.fetch("846604279288168468")
                .then(guild => {
                    return guild.channels.cache.find(channel => channel.id === "846605592054857728");
                })
                .then(async (feedbackChannel: TextChannel) => {
                    return feedbackChannel.send(
                        client.Embed()
                            .setTitle(`${msg.author.username} Says`)
                            .setDescription(feedback)
                            .setThumbnail(feedbackChannel.guild.iconURL({ dynamic: true }))
                            .addField("Server", `${msg.guild.name} | [Invite](${(await msg.guild.fetchInvites()).first()})`)
                    );
                })
                .then(() => {
                    msg.delete();
                    return msg.reply("Successfully sent feedback!");
                });
    }
}