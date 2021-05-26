import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { StripISO, User } from "../../Ripple/Util";
import Ripple from "../../Ripple/Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "serverinfo";
        super(name, {
            aliases: [name, "guildinfo", "aboutserver"],
            description: "Returns the amount of members in the guild executed in."
        });
    }

    public async exec(msg: Message) {
        return msg.reply(
            this.client.Embed()
                .setTitle(msg.guild.name)
                .setDescription(msg.guild.description ?? "")
                .setThumbnail(msg.guild.iconURL({ dynamic: true }))
                .addField("Members", msg.guild.memberCount, true)
                .addField("Region", msg.guild.region, true)
                .addField("Created On", StripISO(msg.guild.createdAt), true)
                .addField("Owner", User(msg.guild.ownerID), true)
                .addField("Nitro Boost Tier", msg.guild.premiumTier, true)
                .addField("Partnered", msg.guild.partnered ? "Yes" : "No", true)
                .addField("AFK Timeout", Math.round(msg.guild.afkTimeout / 60) + " Minutes", true)
                .addField("AFK Channel", msg.guild.afkChannel.name, true)
        );
    }
}