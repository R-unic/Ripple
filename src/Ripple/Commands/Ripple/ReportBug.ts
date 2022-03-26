import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
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
        return !bug?
            this.client.Logger.MissingArgError(msg, "bug")
            :this.client.guilds.fetch("846604279288168468")
                .then(guild => {
                    return guild.channels.cache.find(channel => channel.id === "846613726332321813");
                })
                .then(async (bugsChannel: TextChannel) => {
                    bugsChannel.send("<@415233686758359051>");
                    bugsChannel.send(
                        this.client.Embed()
                            .setTitle(`Bug Report from: ${msg.author.username}`)
                            .setDescription(bug)
                            .setThumbnail(bugsChannel.guild.iconURL({ dynamic: true }))
                            .addField("Server", `${msg.guild.name} | [Invite](${(await msg.guild.fetchInvites()).first()})`)
                    );
                })
                .then(() => {
                    msg.delete();
                    return this.client.Success("Successfully sent bug report!");
                });
    }
}