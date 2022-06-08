import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "getgoodbyemessage";
        super(name, {
            aliases: [name, "goodbyemessage", "goodbyemsg", "getgoodbyemsg",  "goodbye"],
            userPermissions: "MANAGE_GUILD",
            clientPermissions: "MANAGE_GUILD",
            cooldown: 3e3,
            description: "Returns the goodbye message said when a user leaves the server.",
        });
    }

    public async exec(msg: Message) {
        return this.client.GoodbyeMessage.Get(msg, "Goodbye message is disabled for this server.")
            .then(byeMsg => msg.reply(
                this.client.Embed(`Goodbye Message In \`${msg.guild.name}\``)
                    .setDescription(byeMsg)
            ));
    }
}