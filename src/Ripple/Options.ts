import { AkairoHandlerOptions, CommandHandlerOptions } from "discord-akairo";
import { GiveawaysManagerOptions } from "discord-giveaways";
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
    } as GiveawaysManagerOptions,
    CommandHandler: {
        automateCategories: true,
        directory: __dirname + "/Commands/",
        blockClient: true,
        commandUtil: true,
        allowMention: true,
        defaultCooldown: 1e3,
        argumentDefaults: {
            prompt: {
                cancel: (msg: Message) => `${msg.member}, command cancelled.`,
                ended: (msg: Message) => `${msg.member}, command declined.`,
                modifyRetry: (msg, text) => text && `${msg.member}, ${text}\n\nType \`cancel\` to cancel the command.`,
                modifyStart: (msg, text) => text && `${msg.member}, ${text}\n\nType \`cancel\` to cancel the command.`,
                retries: 3,
                cancelWord: "cancel",
                time: 30e3,
                timeout: (msg: Message) => `${msg.member}, command expired.`
            }
        }
    } as CommandHandlerOptions,
    InhibitorHandler: {
        directory: __dirname + "/Inhibitors/"
    } as AkairoHandlerOptions
}