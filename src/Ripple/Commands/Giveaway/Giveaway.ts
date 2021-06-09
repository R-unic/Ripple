import { Command } from "discord-akairo";
import { GuildMember, Message, TextChannel } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";
import ms = require("ms");

export default class extends Command<Ripple> {
    public constructor() {
        const name = "giveaway";
        super(name, {
            aliases: [name, "newgiveaway", "startgiveaway", "ga"],
            userPermissions: "MANAGE_CHANNELS",
            cooldown: 10e3,
            description: {
                content: "Starts a new giveaway.",
                usage: '<"prize"> <time> <winnerAmount?> <channel?>',
                examples: ['"Discord Nitro" 1d 1 #giveaways', '"Spotify Premium Account" 3days']
            },
            args: [
                Arg("prize", "string"),
                Arg("time", "string"),
                Arg("winnerAmount", "number", 1),
                Arg("host", "member", msg => msg.member),
                Arg("channel", "textChannel", msg => msg.channel)
            ]
        });
    }

    public async exec(msg: Message, { prize, time, winnerAmount, host, channel }: { prize: string, time: string, winnerAmount: number, host: GuildMember, channel: TextChannel }) {
        if (!time)
            return this.client.Logger.MissingArgError(msg, "time");

        if (!prize)
            return this.client.Logger.MissingArgError(msg, "prize");

        return this.client.Giveaways.start(channel, {
            time: ms(time),
            winnerCount: winnerAmount,
            prize: prize,
            hostedBy: host.user
        });
    }
}