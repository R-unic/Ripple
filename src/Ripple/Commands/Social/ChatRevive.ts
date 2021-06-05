import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg, Role, User } from "../../Util";
import { Note } from "../../Components/DataManagement/Managers/User/NotesManager";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "chatrevive";
        super(name, {
            aliases: [name, "revivechat", "makeactive", "heyeveryone"],
            cooldown: 60e3,
            description: {
                content: "Pings the role set for chat revive, or @everyone.",
                usage: '<"message">'
            },
            args: [ Arg("message", "string") ]
        });
    }

    public async exec(msg: Message, { message }: { message: string }) {
        if (!message)
            return this.client.Logger.MissingArgError(msg, "message");

        const roleID = await this.client.ChatReviveRole.Get(msg);
        return msg.channel.send(Role(roleID))
            .then(() => msg.reply(
                this.client.Embed("Chat Revive")
                    .setAuthor(`Initiated by \`${msg.author.tag}\``)
                    .setDescription(message)
            ));
    }
}