import { Role } from "discord.js";
import { ClientEvents, GuildMember } from "discord.js";
import { error, log } from "console";
import Ripple from "./Client";

const Events = new Map<keyof ClientEvents, Function>([
    ["ready", (client: Ripple) => log(`Ripple ${client.Version} is now online.`)],
    ["error", (_, err) => error(err)],
    ["guildMemberAdd", (client: Ripple, member: GuildMember) => {
        if (member.user === client.user) {
            client.UpdatePresence();
            member.guild.systemChannel.send("Thanks for inviting me! My prefix is `::`. If you need any help, just say `::help`.");
        }

        client.Get(member, "autorole")
            .then((roleID: string) => {
                return member.guild.roles.resolve(roleID);
            })
            .then((role?: Role) => role ? member.roles.add(role) : undefined);
    }]
]);

export default Events;