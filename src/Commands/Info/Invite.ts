import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "invite";
        super(name, {
            aliases: [name, "invitelink", "inviteme", "invitebot"],
            description: "Returns an invite link for Ripple."
        });
    }

    public async exec(msg: Message) {
        const client = this.client as RippleClient;
        return msg.reply(
            client.Embed()
                .setTitle("Invite Me! 🔗")
                .setURL("https://bit.ly/2SjjB3d")
        );
    }
}