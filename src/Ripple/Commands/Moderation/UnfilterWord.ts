import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "unfilterword";
        super(name, {
            aliases: [name, "unblacklistword", "whitelistword", "wordunfilter"],
            userPermissions: "MANAGE_MESSAGES",
            cooldown: 1e3,
            ratelimit: 2,
            description: {
                content: "Removes the specified word from the text filter.",
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

        return this.client.Filter.Remove(msg, word)
            .then(() => msg.reply(
                this.client.Success(`Successfully removed "${word}" from the filter.`)
            ));
    }
}