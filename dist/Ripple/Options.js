"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = void 0;
exports.Options = {
    GiveawayManager: {
        storage: "./GiveawayStorage.json",
        updateCountdownEvery: 10000,
        hasGuildMembersIntent: false,
        default: {
            botsCanWin: false,
            exemptPermissions: ["ADMINISTRATOR"],
            embedColor: "#FF00DD",
            embedColorEnd: "#FF8800",
            reaction: "🎉"
        }
    },
    CommandHandler: {
        automateCategories: true,
        directory: __dirname + "/Commands/",
        blockClient: true,
        commandUtil: true,
        allowMention: true,
        defaultCooldown: 1e3,
        argumentDefaults: {
            prompt: {
                cancel: (msg) => `${msg.member}, command cancelled.`,
                ended: (msg) => `${msg.member}, command declined.`,
                modifyRetry: (msg, text) => text && `${msg.member}, ${text}\n\nType \`cancel\` to cancel the command.`,
                modifyStart: (msg, text) => text && `${msg.member}, ${text}\n\nType \`cancel\` to cancel the command.`,
                retries: 3,
                cancelWord: "cancel",
                time: 30e3,
                timeout: (msg) => `${msg.member}, command expired.`
            }
        }
    },
    InhibitorHandler: {
        directory: __dirname + "/Inhibitors/"
    }
};
