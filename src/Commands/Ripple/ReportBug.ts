import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import Ripple from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "reportbug";
        super(name, {
            aliases: [name, "bugreport", "bug"],
            description: {
                content: "Sends a bug report to the #bugs channel in the Ripple server.",
                usage: '<"bug">'
            },
            args: [
                {
                    id: "bug",
                    type: "string"
                }
            ]
        });
    }

    public async exec(msg: Message, { bug }: { bug: string }) {
        const client = this.client as Ripple;

        return !bug?
            client.Logger.MissingArgError(msg, "bug")
            :
            client.guilds.fetch("846604279288168468")
                .then(guild => {
                    return guild.channels.cache.find(channel => channel.id === "846613726332321813");
                })
                .then(async (bugsChannel: TextChannel) => {
                    return bugsChannel.send(
                        client.Embed()
                            .setTitle(`Bug Report from: ${msg.author.username}`)
                            .setDescription(bug)
                            .setThumbnail(bugsChannel.guild.iconURL({ dynamic: true }))
                            .addField("Server", `${msg.guild.name} | [Invite](${(await msg.guild.fetchInvites()).first()})`)
                    );
                })
                .then(() => {
                    msg.delete();
                    return msg.reply("Successfully sent bug report!");
                });
    }
}