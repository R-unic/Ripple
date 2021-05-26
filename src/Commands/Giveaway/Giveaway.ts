import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
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
                usage: '<"prize"> <time> <winnerAmount?> <channel?>'
            },
            args: [
                {
                    id: "prize",
                    type: "string"
                },
                {
                    id: "time",
                    type: "string"
                },
                {
                    id: "winnerAmount",
                    type: "number",
                    default: 1
                },
                {
                    id: "channel",
                    type: "textChannel"
                }
            ]
        });
    }

    public async exec(msg: Message, { prize, time, winnerAmount, channel = msg.channel as TextChannel }: { prize: string, time: string, winnerAmount: number, channel: (TextChannel | undefined) }) {
        const client = this.client as RippleClient;

        if (!time)
            return client.Logger.MissingArgError(msg, "time");
        if (!prize)
            return client.Logger.MissingArgError(msg, "prize");

        return client.Giveaways.start(channel, {
            time: ms(time),
            winnerCount: winnerAmount,
            prize: prize
        });
    }
}