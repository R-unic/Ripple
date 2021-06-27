import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { StripISO, User } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "serverinfo";
        super(name, {
            aliases: [name, "guildinfo", "aboutserver"],
            description: "Returns information about the server executed in."
        });
    }

    public async exec(msg: Message) {
        const guild = msg.guild?? msg.member.guild;
        return msg.reply(
            this.client.Embed(guild.name)
                .setDescription(guild.description?? "")
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .addField("Members", guild.memberCount, true)
                .addField("Region", guild.region, true)
                .addField("Created On", StripISO(guild.createdAt), true)
                .addField("Owner", User(guild.ownerID), true)
                .addField("Nitro Boost Tier", guild.premiumTier, true)
                .addField("Partnered", guild.partnered ? "Yes" : "No", true)
                .addField("AFK Timeout", Math.round(guild.afkTimeout / 60) + " Minutes", true)
                .addField("AFK Channel", guild.afkChannel.name, true)
        );
    }
}