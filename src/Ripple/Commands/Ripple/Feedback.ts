import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "feedback";
        super(name, {
            aliases: [name, "submitfeedback", "givefeedback", "suggestion", "suggest", "fb"],
            description: {
                content: "Sends feedback to the #feedback channel in the Ripple server.",
                usage: '<"feedback">'
            },
            args: [ Arg("feedback", "string") ]
        });
    }

    public async exec(msg: Message, { feedback }: { feedback: string }) {
        return !feedback?
            this.client.Logger.MissingArgError(msg, "feedback")
            :this.client.guilds.fetch("846604279288168468")
                .then(guild => 
                    guild.channels.cache.find(channel => 
                        channel.id === "846605592054857728"
                )).then(async (feedbackChannel: TextChannel) => feedbackChannel.send(
                    this.client.Embed()
                        .setTitle(`${msg.author.username} Says`)
                        .setDescription(feedback)
                        .setThumbnail(feedbackChannel.guild.iconURL({ dynamic: true }))
                        .addField("Server", `${msg.guild.name} | [Invite](${(await msg.guild.fetchInvites()).first()})`)
                )).then(() => {
                    msg.delete();
                    return msg.reply("Successfully sent feedback!");
                });
    }
}