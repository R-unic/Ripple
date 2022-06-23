import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "resetlevels";
        super(name, {
            aliases: [name, "resetlvls", "resetranks", "resetrank", "resetstats"],
            userPermissions: "ADMINISTRATOR",
            cooldown: 20e3,
            ratelimit: 2,
            description: "Resets every users level in the server."
        });
    }

    public async exec(msg: Message) {
        const members = await msg.guild.members.fetch({ force: true });
        for (const m of members.array())
            await this.client.Stats.Reset(m);

        return msg.reply(
            this.client.Success(`Successfully reset all level data.`)
        ).catch(err => this.client.Logger.DatabaseError(msg, err));
    }
}