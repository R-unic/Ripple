import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Ripple/Util";
import Ripple from "../../Ripple/Client";

export default class extends Command<Ripple> {
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
        return !giveawayMessage? 
            this.client.Logger.MissingArgError(msg, "giveawayMessage")
            :
            this.client.Giveaways.delete(giveawayMessage.id)
            .then(() => msg.reply("Giveaway sucessfully deleted!"))
            .catch(() => msg.reply(`No giveaway with message ID ${giveawayMessage.id} exists.`));
    }
}