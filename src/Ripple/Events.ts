import { log } from "console";
import { 
    Channel, 
    ClientEvents, 
    Guild, 
    GuildChannel, 
    GuildMember, 
    Message, 
    TextChannel, 
    User,
    Snowflake,
    Collection,
    Role
} from "discord.js";
import { ErrorLogger } from "./Components/ErrorLogger";
import { ToTitleCase } from "./Util";
import Ripple from "./Client";

const ReportErrorNow = err => 
    EventErrorLogger.Report(err, new Date(Date.now()));

export const EventErrorLogger = new ErrorLogger;
export const Events = new Map<keyof ClientEvents, Function>([
    ["ready", (client: Ripple) => log(`${client.BotName} ${client.Version} is now online.`)],
    ["error", (_, err) => ReportErrorNow(err)],
    ["guildMemberAdd", async (client: Ripple, member: GuildMember) => {
        if (await client.ModLogs.Get(member))
            client.AddModLog(member, "User Joined", `${member}`);

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

                
        if (await client.Filter.IsProfane(msg) && await client.Filtering.Get(msg))
            return msg.delete()
                .then(m => client.Logger.ProfanityError(m));

        if (await client.LevelSystem.Get(msg))
            await client.Stats.AddMessage(msg).catch(ReportErrorNow);
            
    }],
    ["messageDelete", async (client: Ripple, msg: Message) => {
        if (await client.ModLogs.Get(msg))
            client.AddModLog(msg, "Message Deleted", `"${msg.content}" by ${msg.member}`)
                .catch(ReportErrorNow);

        client.DeleteSniper.Set(<TextChannel>msg.channel, { 
            SenderID: msg.member.id, 
            Message: msg.content 
        }).catch(ReportErrorNow);
    }],
    ["messageDeleteBulk", async (client: Ripple, messages: Collection<Snowflake, Message> ) => {
        const msg: Message = messages.random();
        if (await client.ModLogs.Get(msg))
            client.AddModLog(msg, "Messages Purged", messages.size.toString())
                .catch(ReportErrorNow);

        client.DeleteSniper.Set(<TextChannel>msg.channel, { 
            SenderID: msg.member.id, 
            Message: msg.content 
        }).catch(ReportErrorNow);
    }],
    ["messageUpdate", async (client: Ripple, msg: Message) => {
        if (await client.ModLogs.Get(msg))
            client.AddModLog(msg, "Message Updated", `"${msg.content}" by ${msg.member}`);

        client.EditSniper.Set(<TextChannel>msg.channel, { 
            SenderID: msg.member.id, 
            Message: msg.content 
        }).catch(ReportErrorNow);

        if (await client.AFK.Is(msg.member))
            await client.AFK.Cancel(msg.member)
                .then(() => {
                    if (msg.member.nickname.includes("[AFK]"))
                        return msg.member.setNickname(msg.member.nickname.slice(6), "AFK status");
                }).then(() => msg.reply(
                    client.Success(`${msg.member} is no longer AFK.`)
                )).catch(ReportErrorNow);
    }],
    ["guildBanAdd", async (client: Ripple, server: Guild, user: User) => 
        (await client.ModLogs.Get(server.channels.cache.random() as TextChannel)) ? client.AddModLog(server.channels.cache.random() as TextChannel, "User Banned", `@${user.tag}`) : undefined
    ],
    ["guildBanRemove", async (client: Ripple, server: Guild, user: User) => 
        (await client.ModLogs.Get(server.channels.cache.random() as TextChannel)) ? client.AddModLog(server.channels.cache.random() as TextChannel, "User Unbanned", `@${user.tag}`) : undefined
    ],
    ["channelCreate", async (client: Ripple, channel: Channel) => 
        (await client.ModLogs.Get(channel as TextChannel)) ? client.AddModLog(channel as TextChannel, ToTitleCase(channel.type) + "Channel Created", (channel as GuildChannel).name) : undefined
    ],
    ["channelDelete", async (client: Ripple, channel: Channel) => 
        (await client.ModLogs.Get(channel as TextChannel)) ? client.AddModLog(channel as TextChannel, ToTitleCase(channel.type) + "Channel Deleted", (channel as GuildChannel).name) : undefined
    ],
    ["channelUpdate", async (client: Ripple, channel: Channel) => 
        (await client.ModLogs.Get(channel as TextChannel)) ? client.AddModLog(channel as TextChannel, ToTitleCase(channel.type) + "Channel Updated", (channel as GuildChannel).name) : undefined
    ],
    ["guildUpdate", async (client: Ripple, old: Guild, current: Guild) =>
        (await client.ModLogs.Get(current.channels.cache.random() as TextChannel)) ? client.AddModLog(current.channels.cache.random() as TextChannel, "Server Updated", current.name) : undefined
    ],
    ["roleCreate", async (client: Ripple, role: Role) => 
        (await client.ModLogs.Get(role)) ? client.AddModLog(role, "Role Created", role) : undefined
    ],
    ["roleDelete", async (client: Ripple, role: Role) => 
        (await client.ModLogs.Get(role)) ? client.AddModLog(role, "Role Deleted", role) : undefined
    ],
    ["roleUpdate", async (client: Ripple, role: Role) => 
        (await client.ModLogs.Get(role)) ? client.AddModLog(role, "Role Updated", role) : undefined
    ]
]);