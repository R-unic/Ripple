import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "reputation";
        super(name, {
            aliases: [name, "rep", "addrep", "giverep"],
            cooldown: 3600e3,
            ratelimit: 2,
            description: {
                content: "Adds a reputation point to the given user.",
                usage: "<@member>"
            },
            args: [ Arg("user", "member") ]
        });
    }

    public async exec(msg: Message, { user }: { user: GuildMember }) {
        if (user === msg.member)
            return this.client.Logger.InvalidArgError(msg, "You cannot give a reputation point to yourself.");

        if (user.user.bot)
            return this.client.Logger.InvalidArgError(msg, "You cannot give a reputation point to a bot.");

        return this.client.Reputation.Increment(user)
            .then(async () => msg.reply(
                this.client.Success()
                    .setDescription(`Successfully added a reputation point to ${user}. They now have ${await this.client.Reputation.Get(user)} reputation.`)  
            ));
    }
}