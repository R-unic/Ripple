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

    public async exec(msg: Message, { prize, time, winnerAmount, channel }: { prize: string, time: string, winnerAmount: number, channel: (TextChannel | undefined) }) {
        const client = this.client as RippleClient;
        const exampleCommand = 'E.g. `::giveaway 1d 1 "Discord Nitro"`';

        if (!time)
            return msg.reply(`Please specify a time that the giveaway will last for. ${exampleCommand}`);
        if (!winnerAmount)
            return msg.reply(`Please specify an amount of winners for the giveaway. ${exampleCommand}`);
        if (!prize)
            return msg.reply(`Please specify a prize that the giveaway will award. ${exampleCommand}`);

        return client.Giveaways.start(channel ?? (msg.channel as TextChannel), {
            time: ms(time),
            winnerCount: winnerAmount,
            prize: prize
        });
    }
}