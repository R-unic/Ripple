import { Command } from "discord-akairo";
import { GuildResolvable, Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "generateinvite";
        super(name, {
            aliases: [name, "geninvite", "geninv"],
            ownerOnly: true,
            description: {
                content: "Generates an invite for a server ID.",
                usage: "<serverID>"
            },
            args: [ 
                Arg("serverID", "string"),
            ]
        });
    }

    public async exec(msg: Message, { serverID }: { serverID: GuildResolvable }) {
        if (!serverID)
            return this.client.Logger.MissingArgError(msg, "serverID");

        const s = this.client.guilds.resolve(serverID);
        const inv = (await s.fetchInvites()).first();
        return msg.reply(
            this.client.Success("Successfully generated invite URL: " + inv.url)
        );
    }
}