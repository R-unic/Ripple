import { Role } from "discord.js";
import { ClientEvents, GuildMember } from "discord.js";
import { error, log } from "console";
import RippleClient from "./Client";

const Events = new Map<keyof ClientEvents, Function>([
    ["ready", (client: RippleClient) => log(`Ripple ${client.Version} is now online.`)],
    ["error", (_, err) => error(err)],
    ["guildMemberAdd", (client: RippleClient, member: GuildMember) => {
        client.Get(member, "autorole")
            .then((roleID: string) => {
                return member.guild.roles.resolve(roleID);
            })
            .then((role?: Role) => role ? member.roles.add(role) : undefined);
    }]
]);

export default Events;