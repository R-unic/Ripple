import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "invite";
        super(name, {
            aliases: [name, "invitelink", "inviteme", "invitebot"],
            description: "Returns an invite link for Ripple."
        });
    }

    public async exec(msg: Message) {
        return msg.reply(
            this.client.Embed("Invite Me! 🔗")
                .setURL(this.client.InviteLink)
        );
    }
}