import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class Invite extends Command {
    public constructor() {
        const name = "invite";
        super(name, {
            aliases: [name, "invitelink", "inviteme", "invitebot"],
            description: "Returns an invite link for Ripple.",
            category: "Info"
        });
    }

    public async exec(msg: Message) {
        return msg.reply(
            new MessageEmbed()
                .setTitle("Invite Me! 🔗")
                .setURL("https://bit.ly/2SjjB3d")
                .setColor("RANDOM")
                .setTimestamp()
        );
    }
}