import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command<RippleClient> {
    public constructor() {
        const name = "invite";
        super(name, {
            aliases: [name, "invitelink", "inviteme", "invitebot"],
            description: "Returns an invite link for Ripple."
        });
    }

    public async exec(msg: Message) {
        return msg.reply(
            this.client.Embed()
                .setTitle("Invite Me! 🔗")
                .setURL(this.client.InviteLink)
        );
    }
}