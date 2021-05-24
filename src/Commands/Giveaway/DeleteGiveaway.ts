import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "deletegiveaway";
        super(name, {
            aliases: [name, "delgiveaway", "deletega", "delga"],
            userPermissions: "MANAGE_CHANNELS",
            description: {
                content: "Deletes a giveaway.",
                usage: '<messageID>'
            },
            args: [
                {
                    id: "giveawayMessage",
                    type: "message"
                }
            ]
        });
    }

    public async exec(msg: Message, { giveawayMessage }: { giveawayMessage: Message }) {
        const client = this.client as RippleClient;
        return client.Giveaways.delete(giveawayMessage.id)
            .then(() => msg.reply("Giveaway sucessfully deleted!"))
            .catch(() => msg.reply(`No giveaway with message ID ${giveawayMessage.id} exists.`));
    }
}