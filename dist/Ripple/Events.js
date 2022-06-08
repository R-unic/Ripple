"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = exports.EventErrorLogger = void 0;
const tslib_1 = require("tslib");
const console_1 = require("console");
const ErrorLogger_1 = require("./Components/ErrorLogger");
const Util_1 = require("./Util");
const ReportErrorNow = err => exports.EventErrorLogger.Report(err, new Date(Date.now()));
exports.EventErrorLogger = new ErrorLogger_1.ErrorLogger;
exports.Events = new Map([
    ["ready", (client) => (0, console_1.log)(`${client.BotName} ${client.Version} is now online.`)],
    ["error", (_, err) => ReportErrorNow(err)],
    ["guildMemberAdd", (client, member) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            if (yield client.ModLogs.Get(member))
                client.AddModLog(member, "User Joined", `${member}`);
            if (member.user === client.user)
                return client.UpdatePresence();
            yield client.WelcomeMessage.Send(member);
            return client.AutoRole.Get(member)
                .then(roleID => member.guild.roles.resolve(roleID))
                .then(role => role ? member.roles.add(role) : undefined)
                .catch(ReportErrorNow);
        })],
    ["message", (client, msg) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const content = msg.content;
            if (content === "##FixPrefix*")
                return client.Prefix.Set(msg, yield client.Prefix.Get(msg))
                    .then(() => msg.reply(client.Success(`Successfully fixed server prefix, which is now \`${client.DefaultPrefix}\`.`))).catch(ReportErrorNow);
            if ((yield client.Filter.IsProfane(msg)) && (yield client.Filtering.Get(msg)))
                return msg.delete()
                    .then(m => client.Logger.ProfanityError(m));
            if (yield client.LevelSystem.Get(msg))
                yield client.Stats.AddMessage(msg).catch(ReportErrorNow);
        })],
    ["messageDelete", (client, msg) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            if (yield client.ModLogs.Get(msg))
                client.AddModLog(msg, "Message Deleted", `"${msg.content}" by ${msg.member}`)
                    .catch(ReportErrorNow);
            client.DeleteSniper.Set(msg.channel, {
                SenderID: msg.member.id,
                Message: msg.content
            }).catch(ReportErrorNow);
        })],
    ["messageDeleteBulk", (client, messages) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const msg = messages.random();
            if (yield client.ModLogs.Get(msg))
                client.AddModLog(msg, "Messages Purged", messages.size.toString())
                    .catch(ReportErrorNow);
            client.DeleteSniper.Set(msg.channel, {
                SenderID: msg.member.id,
                Message: msg.content
            }).catch(ReportErrorNow);
        })],
    ["messageUpdate", (client, msg) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            if (yield client.ModLogs.Get(msg))
                client.AddModLog(msg, "Message Updated", `"${msg.content}" by ${msg.member}`);
            client.EditSniper.Set(msg.channel, {
                SenderID: msg.member.id,
                Message: msg.content
            }).catch(ReportErrorNow);
            if (yield client.AFK.Is(msg.member))
                yield client.AFK.Cancel(msg.member)
                    .then(() => {
                    if (msg.member.nickname.includes("[AFK]"))
                        return msg.member.setNickname(msg.member.nickname.slice(6), "AFK status");
                }).then(() => msg.reply(client.Success(`${msg.member} is no longer AFK.`))).catch(ReportErrorNow);
        })],
    ["guildBanAdd", (client, server, user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return (yield client.ModLogs.Get(server.channels.cache.random())) ? client.AddModLog(server.channels.cache.random(), "User Banned", `@${user.tag}`) : undefined; })
    ],
    ["guildBanRemove", (client, server, user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return (yield client.ModLogs.Get(server.channels.cache.random())) ? client.AddModLog(server.channels.cache.random(), "User Unbanned", `@${user.tag}`) : undefined; })
    ],
    ["channelCreate", (client, channel) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return (yield client.ModLogs.Get(channel)) ? client.AddModLog(channel, (0, Util_1.ToTitleCase)(channel.type) + "Channel Created", channel.name) : undefined; })
    ],
    ["channelDelete", (client, channel) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return (yield client.ModLogs.Get(channel)) ? client.AddModLog(channel, (0, Util_1.ToTitleCase)(channel.type) + "Channel Deleted", channel.name) : undefined; })
    ],
    ["channelUpdate", (client, channel) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return (yield client.ModLogs.Get(channel)) ? client.AddModLog(channel, (0, Util_1.ToTitleCase)(channel.type) + "Channel Updated", channel.name) : undefined; })
    ],
    ["guildUpdate", (client, old, current) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return (yield client.ModLogs.Get(current.channels.cache.random())) ? client.AddModLog(current.channels.cache.random(), "Server Updated", current.name) : undefined; })
    ],
    ["roleCreate", (client, role) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return (yield client.ModLogs.Get(role)) ? client.AddModLog(role, "Role Created", role) : undefined; })
    ],
    ["roleDelete", (client, role) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return (yield client.ModLogs.Get(role)) ? client.AddModLog(role, "Role Deleted", role) : undefined; })
    ],
    ["roleUpdate", (client, role) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return (yield client.ModLogs.Get(role)) ? client.AddModLog(role, "Role Updated", role) : undefined; })
    ]
]);
