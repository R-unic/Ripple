import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "discriminator";
        super(name, {
            aliases: [name, "discrim", "tag"],
            description: {
                content: "Returns a list of users with the discriminator provided.",
                usage: "<discrim>"
            },
            args: [ Arg("discrim", "string") ]
        });
    }

    public async exec(msg: Message, { discrim }: { discrim: string }) {
        if (!discrim)
            return this.client.Logger.MissingArgError(msg, "discrim");

        discrim = discrim.replace("#", "");

        if (discrim.length > 4)
            return this.client.Logger.InvalidArgError(msg, "Discriminator must not be longer than 4 characters.");

        const usersWithDiscrim = msg.guild.members.cache
            .filter(member => member.user.discriminator === discrim)
            .array();

        return msg.reply(
            this.client.Embed(`\`${usersWithDiscrim.length}\` users have the discriminator \`#${discrim}\``)
                .setDescription(usersWithDiscrim.join("\n"))
        );
    }
}