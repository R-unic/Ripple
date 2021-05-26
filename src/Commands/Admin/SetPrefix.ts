import { Command } from "discord-akairo";
import { Message, Role } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "setprefix";
        super(name, {
            aliases: [name, "setserverprefix", "serverprefix", "prefix"],
            userPermissions: "MANAGE_GUILD",
            clientPermissions: "MANAGE_GUILD",
            cooldown: 3,
            description: {
                content: "Sets the bot prefix for the server executed in.",
                usage: "<newPrefix?>"
            },
            args: [
                {
                    id: "prefix",
                    type: "string"
                }
            ],
        });
    }

    public async exec(msg: Message, { prefix }: { prefix: string }) {
        const client = this.client as RippleClient;
        client.SetPrefix(msg, prefix ?? "::");
        return msg.reply(
            client.Success()
                .setDescription(prefix ? `Successfully set prefix to \`${prefix}\`.` : `Successfully reset prefix.`)
        );
    }
}