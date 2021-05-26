import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Ripple/Util";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "deletegiveaway";
        super(name, {
            aliases: [name, "delgiveaway", "deletega", "delga"],
            userPermissions: "MANAGE_CHANNELS",
            description: {
                content: "Deletes a giveaway via message ID.",
                usage: '<messageID>',
                examples: ['846958982743588864']
            },
            args: [ Arg("giveawayMessage", "message") ]
        });
    }

    public async exec(msg: Message, { giveawayMessage }: { giveawayMessage: Message }) {
        const client = this.client as RippleClient;

        return !giveawayMessage? 
            client.Logger.MissingArgError(msg, "giveawayMessage")
            :
            client.Giveaways.delete(giveawayMessage.id)
            .then(() => msg.reply("Giveaway sucessfully deleted!"))
            .catch(() => msg.reply(`No giveaway with message ID ${giveawayMessage.id} exists.`));
    }
}