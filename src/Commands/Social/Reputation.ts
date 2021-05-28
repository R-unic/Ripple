import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Ripple/Util";
import Ripple from "../../Ripple/Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "reputation";
        super(name, {
            aliases: [name, "rep", "addrep", "giverep"],
            cooldown: 3600,
            description: {
                content: "Adds a reputation point to the given user.",
                usage: "<@member>"
            },
            args: [
                Arg("member", "member"),
            ],
        });
    }

    public async exec(msg: Message, { member }: { member: GuildMember }) {
        if (member === msg.member)
            return this.client.Logger.InvalidArgError(msg, "You cannot give a reputation point to yourself.");

        if (member.user.bot)
            return this.client.Logger.InvalidArgError(msg, "You cannot give a reputation point to a bot.");

        return this.client.Reputation.Increment(member)
            .then(async () => msg.reply(
                this.client.Success()
                    .setDescription(`Successfully added a reputation point to ${member}. They now have ${await this.client.Reputation.Get(member)} reputation.`)  
            ));
    }
}