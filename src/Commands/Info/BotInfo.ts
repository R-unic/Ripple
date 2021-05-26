import { Command } from "discord-akairo";
import { version as discordJSVersion, Message } from "discord.js";
import { Hyperlink, StripISO } from "../../Ripple/Util";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "botinfo";
        super(name, {
            aliases: [name, "rippleinfo", "aboutripple", "about"],
            description: "Returns information about Ripple."
        });
    }

    public async exec(msg: Message) {
        const client = this.client as RippleClient;
        return msg.reply(
            client.Embed()
                .setTitle(`Ripple`)
                .setDescription(`
                An open-source all-purpose Discord bot built with TypeScript.
                ${Hyperlink(client.InviteLink, "Invite")} | ${Hyperlink(client.Website, "Website")} | ${Hyperlink(client.GitHubRepo, "GitHub Repository")}
                `)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .addField("Developer", (client.ownerID as string[]).map(id => `<@!${id}>`).join(", "), true)
                .addField("Prefix", await client.GetPrefix(msg, "::"), true)
                .addField("Commands", client.CommandCount, true)
                .addField("Created On", StripISO(client.user.createdAt), true)
                .addField("Version", client.Version, true)
                .addField("Library", `Discord.js v${discordJSVersion}`, true)
                .addField("Language", "TypeScript 4.2.4", true)
                .addField("Compiled Environment", `Node ${process.version}`, true)
        );
    }
}