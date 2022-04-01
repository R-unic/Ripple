import { Command } from "discord-akairo";
import { GuildMember, Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "givepremium";
        super(name, {
            aliases: [name, "awardpremium", "giveripplepremium", "awardripplepremium"],
            ownerOnly: true,
            description: {
                content: "Gives a user Ripple Premium for free.",
                usage: "<@user?>"
            },
            args: [ Arg("member", "member", msg => msg.member) ]
        });
    }

    public async exec(msg: Message, { member }: { member: GuildMember }) {
        if (!member)
            return this.client.Logger.MissingArgError(msg, "user");

        const user = member.user;
        const hasPremium = await this.client.Premium.Has(user);
        if (hasPremium)
            return this.client.Logger.InvalidArgError(msg, "User already has Premium.");

        return this.client.Premium.Set(user, true)
            .then(() => msg.reply(
                this.client.Success(`Successfully gave ${member} Ripple Premium.`)
            ));
    }
}