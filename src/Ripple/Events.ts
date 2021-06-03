import { ClientEvents, GuildMember, Message, TextChannel } from "discord.js";
import { log } from "console";
import { Channel, RomanNumeral, User } from "./Util";
import { ErrorLogger } from "./Components/ErrorLogger";
import Ripple from "./Client";

const ReportErrorNow = err => 
    EventErrorLogger.Report(err, new Date(Date.now()));

export const EventErrorLogger = new ErrorLogger;
export const Events = new Map<keyof ClientEvents, Function>([
    ["ready", (client: Ripple) => log(`${client.BotName} ${client.Version} is now online.`)],
    ["error", (_, err) => ReportErrorNow(err)],
    ["message", async (client: Ripple, msg: Message) => {
        if (msg.content === "##FixPrefix*")
            client.Prefix.Set(msg, await client.Prefix.Get(msg))
                .then(() => msg.reply(
                    client.Success(`Successfully fixed server prefix, which is now \`${client.DefaultPrefix}\`.`)
                )).catch(ReportErrorNow);
    }],
    ["guildMemberAdd", async (client: Ripple, member: GuildMember) => {
        if (member.user === client.user)
            return client.UpdatePresence();
        
        const welcomeMsg = await client.WelcomeMessage.Get(member, undefined);
        if (welcomeMsg != undefined)
            member.guild.systemChannel.send(
                client.Embed(member.guild.name)
                    .setThumbnail(member.guild.iconURL({ dynamic: true }))
                    .setDescription(
                        welcomeMsg
                            .replace(/{member}/, User(member.id))
                            .replace(/{server.name}/, member.guild.name)
                            .replace(/{server.memberCount}/, member.guild.memberCount.toString())
                            .replace(/{server.rulesChannel}/, Channel(member.guild.rulesChannelID))
                    )
            ).catch(ReportErrorNow);

        return client.AutoRole.Get(member)
            .then(roleID => member.guild.roles.resolve(roleID))
            .then(role => role ? member.roles.add(role) : undefined)
            .catch(async err => {
                ReportErrorNow(err);
                member.guild.systemChannel.send("Error!")
                    .then(msg => msg.delete())
                    .then(msg => client.Logger.DiscordAPIError(msg, err))
                    .catch(ReportErrorNow);
            });
    }],
    ["message", async (client: Ripple, msg: Message) => {
        const member: GuildMember = msg.member;
        if (msg.author.bot) return;

        const xpGain: number = await client.Stats.XPGain(member);
        const level: number = await client.Stats.GetLevel(member);
        
        await client.Stats.AddXP(member, xpGain);
        const lvlAfterXPAdd: number = await client.Stats.GetLevel(member);
        const prestige: number = await client.Stats.GetPrestige(member);

        const channelID = await client.LevelUpChannel.Get(msg);
        const channel = channelID ? client.channels.resolve(channelID) as TextChannel : msg.channel;
        
        if (level !== lvlAfterXPAdd)
            return channel.send(
                client.Embed(`Congratulations, ${member.user.tag}!`)
                    .setDescription(`You leveled up! You are now level \`${(prestige !== 0 ? RomanNumeral(prestige) + "-" : "") + lvlAfterXPAdd}\`.`)
            );
    }]
]);