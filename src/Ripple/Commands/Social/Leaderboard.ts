import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { RomanNumeral } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "leaderboard";
        super(name, {
            aliases: [name, "leader", "top", "lb", "leadertop"],
            ratelimit: 2,
            description: "Returns a list of the top stats in the guild."
        });
    }

    public async exec(msg: Message) {
        const leaderboard = (await this.client.Stats.GetLeaderboard(msg.member))
            .map(async (m, i) => {
                const level = await this.client.Stats.GetLevel(m);
                const prestige = await this.client.Stats.GetPrestige(m);
                return `**${i + 1}.** ${m} [${(prestige !== 0 ? `${RomanNumeral(prestige)}-` : "") + (level === 100 ? `${level} (max)` : level)}]`;
            });
        
        let leaderboardText = "";
        for (const m of leaderboard.slice(0, 20))
            leaderboardText += await m + "\n";

        return msg.channel.send(
            this.client.Embed("Levels Leaderboard for `" + msg.guild.name + "`")
                .setDescription(leaderboardText.trim())
                .setThumbnail(msg.guild.iconURL({ dynamic: true }))
        );
    }
}