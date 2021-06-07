import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
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
            return this.client.Logger.LevelSystemError(msg, "Cannot prestige; you are the maximum prestige level.");

        if (await this.client.Stats.GetLevel(user) !== this.client.Stats.MaxLevel)
            return this.client.Logger.LevelSystemError(msg, `Cannot prestige; you aren't level \`${this.client.Stats.MaxLevel}\`.`);

        return this.client.Stats.AddPrestige(user)
            .then(async () => msg.reply(
                this.client.Embed("🌟 Prestiged! 🌟")
                    .setDescription(`You are now prestige \`${await this.client.Stats.GetPrestige(msg.member)}\`!`)
            ));
    }
}