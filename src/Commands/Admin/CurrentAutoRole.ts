import { Command } from "discord-akairo";
import { Message } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command<RippleClient> {
    public constructor() {
        const name = "currentautorole";
        super(name, {
            aliases: [name, "currentjoinrole", "getautorole"],
            cooldown: 2,
            description: "Returns the role applied to a user when they join."
        });
    }

    public async exec(msg: Message) {
        const roleID = (await this.client.Get(msg, "autorole")) as string | undefined;
        return msg.reply(`The current role set for autorole is: ${roleID ? `<@&${roleID}>` : "None"}`);
    }
}