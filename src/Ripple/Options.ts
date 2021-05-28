import { CommandHandlerOptions } from "discord-akairo";
import { Message, PermissionResolvable } from "discord.js";

export const Options = {
    GiveawayManager: {
        storage: "./GiveawayStorage.json",
        updateCountdownEvery: 10000,
        hasGuildMembersIntent: false,
        default: {
            botsCanWin: false,
            exemptPermissions: ["ADMINISTRATOR" as PermissionResolvable],
            embedColor: "#FF00DD",
            embedColorEnd: "#FF8800",
            reaction: "🎉"
        }
    },
    CommandHandler: {
        automateCategories: true,
        directory: __dirname + "/../Commands/",
        blockBots: true,
        blockClient: true,
        commandUtil: true,
        argumentDefaults: {
            prompt: {
                cancel: (msg: Message) => `${msg.author}, command cancelled.`,
                ended: (msg: Message) => `${msg.author}, command declined.`,
                modifyRetry: (msg, text) => text && `${msg.author}, ${text}\n\nType \`cancel\` to cancel this command.`,
                modifyStart: (msg, text) => text && `${msg.author}, ${text}\n\nType \`cancel\` to cancel this command.`,
                retries: 3,
                time: 30000,
                timeout: (msg: Message) => `${msg.author}, command expired.`
            }
        },
    } as CommandHandlerOptions
}