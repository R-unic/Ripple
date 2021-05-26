import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Ripple/Util";
import Ripple from "../../Ripple/Client";

export default class extends Command<Ripple> {
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
            args: [ Arg("prefix", "string") ],
        });
    }

    public async exec(msg: Message, { prefix }: { prefix: string }) {
        this.client.SetPrefix(msg, prefix ?? "::");
        return msg.reply(
            this.client.Success()
                .setDescription(prefix ? `Successfully set prefix to \`${prefix}\`.` : `Successfully reset prefix.`)
        );
    }
}