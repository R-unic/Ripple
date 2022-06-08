import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "filteredwords";
        super(name, {
            aliases: [name, "blacklistedwords", "wordsfiltered", "filtered"],
            ratelimit: 2,
            description: "Returns a list of all filtered words in this guild."
        });
    }

    public async exec(msg: Message) {
        if (!await this.client.Filtering.Get(msg))
            return this.client.Logger.CouldNotBeExecutedError(msg, "Chat filtering is disabled for this guild.");
            
        const filtered = await this.client.Filter.Get(msg);
        return msg.reply(this.client.Embed("Filtered Words", "🚫", filtered.length === 0 ? "None" : filtered.join(", ")));
    }
}