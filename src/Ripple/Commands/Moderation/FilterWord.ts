import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "filterword";
        super(name, {
            aliases: [name, "blacklistword", "wordfilter"],
            userPermissions: "MANAGE_MESSAGES",
            cooldown: 1e3,
            ratelimit: 2,
            description: {
                content: "Adds the specified word to the text filter.",
                usage: '<"word">'
            },
            args: [ Arg("word", "string") ]
        });
    }

    public async exec(msg: Message, { word }: { word: string }) {
        if (!word)
            return this.client.Logger.MissingArgError(msg, "word");

        if (!await this.client.Filtering.Get(msg))
            return this.client.Logger.CouldNotBeExecutedError(msg, "Chat filtering is disabled for this guild.");

        return this.client.Filter.Add(msg, word)
            .then(() => msg.reply(
                this.client.Success(`Successfully added "${word}" to the filter.`)
            ));
    }
}