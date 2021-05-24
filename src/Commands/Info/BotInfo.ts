import { Command } from "discord-akairo";
import { version as discordJSVersion, GuildMember, Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "botinfo";
        super(name, {
            aliases: [name, "rippleinfo"],
            description: "Returns information about Ripple"
        });
    }

    public async exec(msg: Message, { member }: { member: (GuildMember | null) }) {
        const client = this.client as RippleClient;
        return msg.reply(
            client.Embed()
                .setTitle(`Ripple Information`)
                .setDescription("Ripple is an open-source all-purpose Discord bot built with TypeScript.")
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .addField("Developer", (client.ownerID as string[]).map(id => `<@!${id}>`).join(", "), true)
                .addField("Prefix", client.Prefix, true)
                .addField("Version", client.Version, true)
                .addField("Library", discordJSVersion, true)
                .addField("Language", "TypeScript 4.2.4", true)
                .addField("Compiled Environment", process.version, true)
                .addField("Links", `[Invite](${client.InviteLink}) | [GitHub Repository](${client.GitHubRepo})`, true)
        );
    }
}