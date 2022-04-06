import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "blacklist";
        super(name, {
            aliases: [name, "blist", "bl"],
            description: {
                content: "Blacklists a guild member from using Ripple command.",
                usage: '<@member>'
            },
            args: [
                Arg("member", "<@member>")
            ]
        });
    }

    public async exec(msg: Message, { member }: { member: GuildMember }) {
        if (!member)
            this.client.Logger.MissingArgError(msg, "member");
        
        const blacklisted = await this.client.UserBlacklist.Get(member);
        return this.client.UserBlacklist.Set(member, !blacklisted)
            .then(() => 
                msg.reply(
                    this.client.Success(`Successfully ${blacklisted ? "blacklist" : "unblacklist"}ed ${member}`)
                )
            );
    }
}