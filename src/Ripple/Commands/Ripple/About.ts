import { Command } from "discord-akairo";
import { version as discordJSVersion, Message } from "discord.js";
import { Hyperlink, StripISO, User } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "about";
        super(name, {
            aliases: [name, "rippleinfo", "aboutripple", "botinfo", "info"],
            description: "Returns information about Ripple."
        });
    }

    public async exec(msg: Message) {
        return msg.reply(
            this.client.Embed("Ripple")
                .setDescription(`
                An open-source all-purpose Discord bot built with TypeScript.
                ${Hyperlink(this.client.InviteLink, "Invite")} | ${Hyperlink(this.client.Website, "Website")} | ${Hyperlink(this.client.GitHubRepo, "GitHub Repository")}
                `)
                .setThumbnail(this.client.user.displayAvatarURL({ dynamic: true }))
                .addField("Developer", (this.client.ownerID as string[]).map(User).join(", "), true)
                .addField("Default Prefix", this.client.DefaultPrefix, true)
                .addField("Commands", this.client.CommandCount, true)
                .addField("Created On", StripISO(this.client.user.createdAt), true)
                .addField("Version", this.client.Version, true)
                .addField("Library", `Discord.js v${discordJSVersion}`, true)
                .addField("Language", "TypeScript 4.2.4", true)
                .addField("Compiled Environment", `Node ${process.version}`, true)
        );
    }
}