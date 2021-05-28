import { error, log } from "console";
import { ClientEvents, GuildMember, Message } from "discord.js";
import { User } from "./Util";
import Ripple from "./Client";

const Events = new Map<keyof ClientEvents, Function>([
    ["ready", (client: Ripple) => log(`Ripple ${client.Version} is now online.`)],
    ["error", (_, err) => error(err)],
    ["message", async (client: Ripple, msg: Message) => {
        if (msg.content === "##FixPrefix*")
            client.Prefix.Set(msg, await client.Prefix.Get(msg))
                .then(() => msg.reply(
                    client.Success()
                        .setDescription(`Successfully fixed server prefix, which is now \`${client.DefaultPrefix}\`.`)
                ));
    }],
    ["guildMemberAdd", async (client: Ripple, member: GuildMember) => {
        if (member.user === client.user)
            return client.UpdatePresence();
        
        const welcomeMsg: string | undefined = await client.WelcomeMessage.Get(member);
        if (welcomeMsg)
            member.guild.systemChannel.send(
                welcomeMsg
                    .replace(/{server}/, member.guild.name)
                    .replace(/{member}/, User(member.id))
            );

        return client.AutoRole.Get(member)
            .then(roleID => {
                return member.guild.roles.resolve(roleID);
            }).then(role => role ? member.roles.add(role) : undefined)
            .catch(async err => client.Logger.DiscordAPIError(await ((await member.guild.systemChannel.send("Error!")).delete()), err));
    }]
]);

export default Events;