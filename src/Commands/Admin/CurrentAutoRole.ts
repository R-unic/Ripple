import { Command } from "discord-akairo";
import { Message, Role } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "currentautorole";
        super(name, {
            aliases: [name, "currentjoinrole", "getautorole"],
            cooldown: 2,
            description: "Returns the role applied to a user when they join."
        });
    }

    public async exec(msg: Message) {
        const client = this.client as RippleClient;
        const roleID = (await client.Get(msg, "autorole")) as string | undefined;
        return msg.reply(`The current role set for autorole is: ${roleID ? `<@&${roleID}>` : "None"}`);
    }
}