import { log } from "console";
import { ClientEvents, GuildMember, Message } from "discord.js";
import { ErrorLogger } from "./Components/ErrorLogger";
import Ripple from "./Client";

const ReportErrorNow = err => 
    EventErrorLogger.Report(err, new Date(Date.now()));

export const EventErrorLogger = new ErrorLogger;
export const Events = new Map<keyof ClientEvents, Function>([
    ["ready", (client: Ripple) => log(`${client.BotName} ${client.Version} is now online.`)],
    ["error", (_, err) => ReportErrorNow(err)],
    ["guildMemberAdd", async (client: Ripple, member: GuildMember) => {
        if (member.user === client.user)
            return client.UpdatePresence();
        
        await client.WelcomeMessage.Send(member);
        return client.AutoRole.Get(member)
            .then(roleID => member.guild.roles.resolve(roleID))
            .then(role => role ? member.roles.add(role) : undefined)
            .catch(ReportErrorNow);
    }],
    ["message", async (client: Ripple, msg: Message) => {
        const content = msg.content;

        if (content === "##FixPrefix*")
            return client.Prefix.Set(msg, await client.Prefix.Get(msg))
                .then(() => msg.reply(
                    client.Success(`Successfully fixed server prefix, which is now \`${client.DefaultPrefix}\`.`)
                )).catch(ReportErrorNow);

        if (await client.LevelSystem.Get(msg))
            await client.Stats.AddMessage(msg);
    }]
]);