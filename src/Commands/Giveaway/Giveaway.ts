import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import { Arg } from "../../Ripple/Util";
import RippleClient from "../../Ripple/Client";
import ms = require("ms");

export default class extends Command {
    public constructor() {
        const name = "giveaway";
        super(name, {
            aliases: [name, "newgiveaway", "startgiveaway", "ga"],
            userPermissions: "MANAGE_CHANNELS",
            description: {
                content: "Starts a new giveaway.",
                usage: '<"prize"> <time> <winnerAmount?> <channel?>',
                examples: ['"Discord Nitro" 1d 1 #giveaways', '"Spotify Premium Account" 3days']
            },
            args: [
                Arg("prize", "string"),
                Arg("time", "string"),
                Arg("winnerAmount", "number", 1),
                Arg("channel", "textChannel")
            ]
        });
    }

    public async exec(msg: Message, { prize, time, winnerAmount, channel }: { prize: string, time: string, winnerAmount: number, channel?: TextChannel }) {
        const client = this.client as RippleClient;

        if (!time)
            return client.Logger.MissingArgError(msg, "time");
        if (!prize)
            return client.Logger.MissingArgError(msg, "prize");

        return client.Giveaways.start(channel ?? msg.channel as TextChannel, {
            time: ms(time),
            winnerCount: winnerAmount,
            prize: prize
        });
    }
}