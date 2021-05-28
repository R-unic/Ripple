import { ClientEvents, GuildMember, Message } from "discord.js";
import { error, log } from "console";
import Ripple from "./Client";

const Events = new Map<keyof ClientEvents, Function>([
    ["ready", (client: Ripple) => log(`Ripple ${client.Version} is now online.`)],
    ["error", (_, err) => error(err)],
    ["message", async (client: Ripple, msg: Message) => {
        if (msg.content === "##FixPrefix*")
            client.SetPrefix(msg, await client.GetPrefix(msg))
                .then(() => msg.reply(
                    client.Success()
                        .setDescription(`Successfully fixed server prefix, which is now \`${client.DefaultPrefix}\`.`)
                ));
    }],
    ["guildMemberAdd", async (client: Ripple, member: GuildMember) => {
        log("user joined")
        if (member.user === client.user)
            return client.UpdatePresence();
        return client.Get(member, "autorole")
            .then((roleID: string) => {
                return member.guild.roles.resolve(roleID);
            }).then(role => role ? member.roles.add(role) : undefined);
    }]
]);

export default Events;