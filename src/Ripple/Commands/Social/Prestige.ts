import { Command } from "discord-akairo";
import { Guild, GuildMember, Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "prestige";
        super(name, {
            aliases: [name, "ascend"],
            cooldown: 1800e3,
            description: "Resets level to 1 for a permanent XP boost based on your prestige level."
        });
    }

    public async exec(msg: Message) {
        const user: GuildMember = msg.member;
        if (await this.client.Stats.GetPrestige(user) === this.client.Stats.MaxPrestige)
            return msg.reply("Cannot prestige; you are max prestige.");

        return this.client.Stats.AddPrestige(user)
            .then(async () => msg.reply(
                this.client.Embed("🌟 Prestiged! 🌟")
                    .setDescription(`You are now prestige \`${await this.client.Stats.GetPrestige(msg.member)}\`!`)
            ));
    }
}