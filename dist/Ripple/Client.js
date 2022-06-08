"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DataManagement_1 = require("./Components/DataManagement");
const discord_akairo_1 = require("discord-akairo");
const discord_giveaways_1 = require("discord-giveaways");
const wizard101_api_1 = require("wizard101-api");
const Logger_1 = require("./Components/Logger");
const Donation_1 = require("./APIWrappers/Donation");
const IconFinder_1 = require("./APIWrappers/IconFinder");
const Util_1 = require("./Util");
const Options_1 = require("./Options");
const Events_1 = require("./Events");
const RippleCLI_1 = require("../CommandLine/RippleCLI");
const fs_1 = require("fs");
const process_1 = require("process");
const spotify_web_api_js_1 = tslib_1.__importDefault(require("spotify-web-api-js"));
const db = tslib_1.__importStar(require("quick.db"));
/**
 * @extends AkairoClient
 * @description Ripple Discord client
*/
class Ripple extends discord_akairo_1.AkairoClient {
    constructor(DefaultPrefix = "::", immediateLogin = true) {
        super({
            ownerID: ["415233686758359051"],
            // intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES],
            messageCacheLifetime: 10,
            messageCacheMaxSize: 35,
            messageSweepInterval: 3600,
            messageEditHistoryMaxSize: 43200
        });
        this.DefaultPrefix = DefaultPrefix;
        this.CommandHandler = new discord_akairo_1.CommandHandler(this, Options_1.Options.CommandHandler);
        this.Logger = new Logger_1.Logger(this);
        this.Donations = new Donation_1.DonationAPI(this, process_1.env.DONATE_BOT_API);
        this.IconFinder = new IconFinder_1.IconFinderAPI(process_1.env.ICONFINDER_API);
        this.Giveaways = new discord_giveaways_1.GiveawaysManager(this, Options_1.Options.GiveawayManager);
        this.Reputation = new DataManagement_1.ReputationManager(this);
        this.Prefix = new DataManagement_1.PrefixManager(this);
        this.WelcomeMessage = new DataManagement_1.AutoWelcomeManager(this);
        this.AutoRole = new DataManagement_1.AutoRoleManager(this);
        this.Premium = new DataManagement_1.PremiumManager(this);
        this.Cash = new DataManagement_1.CashManager(this);
        this.Bank = new DataManagement_1.BankManager(this);
        this.Stats = new DataManagement_1.LevelManager(this);
        this.Infractions = new DataManagement_1.InfractionManager(this);
        this.Notes = new DataManagement_1.NotesManager(this);
        this.LevelUpChannel = new DataManagement_1.LevelUpChannelManager(this);
        this.UserBlacklist = new DataManagement_1.UserBlacklistManager(this);
        this.WelcomeChannel = new DataManagement_1.WelcomeChannelManager(this);
        this.LevelSystem = new DataManagement_1.LevelSystemManager(this);
        this.ChatReviveRole = new DataManagement_1.ChatReviveRoleManager(this);
        this.PrestigeRoles = new DataManagement_1.PrestigeRoleManager(this);
        this.CommandChannel = new DataManagement_1.CommandChannelManager(this);
        this.DeleteSniper = new DataManagement_1.DeleteSniperManager(this);
        this.EditSniper = new DataManagement_1.EditSniperManager(this);
        this.ModLogs = new DataManagement_1.ModLogsManager(this);
        this.ModLogsChannel = new DataManagement_1.ModLogsChannelManager(this);
        this.ModLogID = new DataManagement_1.ModLogIDManager(this);
        this.Tags = new DataManagement_1.TagManager(this);
        this.GoodbyeChannel = new DataManagement_1.GoodbyeChannelManager(this);
        this.GoodbyeMessage = new DataManagement_1.AutoGoodbyeManager(this);
        this.TimeQueue = new DataManagement_1.TimeQueueManager(this);
        this.Economy = new DataManagement_1.EconomyManager(this);
        this.Purge = new DataManagement_1.PurgeManager(this);
        this.AFK = new DataManagement_1.AFKManager(this);
        this.Filter = new DataManagement_1.ChatFilterManager(this);
        this.Filtering = new DataManagement_1.FilterSystemManager(this);
        this.Wizard101 = wizard101_api_1.Wizard101;
        this.Spotify = new spotify_web_api_js_1.default;
        this.Package = RippleCLI_1.pkg;
        this.Version = `v${this.Package.version}`;
        this.GitHubRepo = "https://github.com/AlphaRunic/Ripple";
        this.DonateLink = "https://donatebot.io/checkout/846604279288168468";
        this.Website = "https://ripple-bot.netlify.app";
        this.InviteLink = `https://discord.com/oauth2/authorize?client_id=840692008419197048&scope=bot&permissions=8`;
        this.CancelCommandLoop = false;
        this.inhibitorHandler = new discord_akairo_1.InhibitorHandler(this, {
            directory: __dirname + "/Inhibitors/"
        });
        if (immediateLogin)
            this.Login();
    }
    /**
     * @description Log in with a token or env.LOGIN_TOKEN
     * @param token
     */
    Login() {
        const _super = Object.create(null, {
            login: { get: () => super.login }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                // console.log(env.LOGIN_TOKEN); // probably dont keep this in production
                const p = _super.login.call(this, process_1.env.LOGIN_TOKEN)
                    .then((res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    this.BotName = this.user.username;
                    yield this.UpdatePresence();
                    return res;
                }));
                yield this.Initialize();
                return p;
            }
            catch (err) {
                this.Logger.ErrorLogger.Report(err, new Date(Date.now()));
            }
        });
    }
    Initialize() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.HandleEvents(Events_1.Events);
            this.LoadCommands();
            // this.Spotify.setAccessToken(env.SPOTIFY_API);
            yield this.Donations.StartTransactionsLoop();
        });
    }
    AddModLog(m, event, content) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const modLogChannelID = yield this.ModLogsChannel.Get(m);
            const modLogChannel = this.channels.resolve(modLogChannelID);
            if (!modLogChannel)
                return;
            const id = yield this.ModLogID.Get(m);
            yield this.ModLogID.Increment(m);
            return modLogChannel.send(this.ModLogEmbed(id)
                .SetEvent(event)
                .SetContent(content)
                .SetDate((0, Util_1.StripISO)(new Date(Date.now()))));
        });
    }
    get Avatar() {
        return this.user.displayAvatarURL({ dynamic: true });
    }
    get FullName() {
        return `${this.BotName} ${this.Version}`;
    }
    get CommandCount() {
        let count = 0;
        (0, fs_1.readdirSync)(`${__dirname}/Commands`)
            .forEach(folder => (0, fs_1.readdirSync)(`${__dirname}/Commands/${folder}`)
            .filter(file => file.endsWith(".ts") || file.endsWith(".js"))
            .forEach(() => count++));
        return count;
    }
    UpdatePresence(activity, activityType, status) {
        return this.user.setPresence({
            status: status !== null && status !== void 0 ? status : "online",
            activity: {
                name: activity !== null && activity !== void 0 ? activity : `${this.guilds.cache.size} servers | ${this.DefaultPrefix}help`,
                type: activityType !== null && activityType !== void 0 ? activityType : "WATCHING"
            }
        });
    }
    GetForUser(user, key, defaultValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                var _a;
                try {
                    const tag = this.Tag(key, user === null || user === void 0 ? void 0 : user.id);
                    resolve(((_a = db.get(tag)) !== null && _a !== void 0 ? _a : defaultValue));
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
    SetForUser(user, key, value) {
        return new Promise((resolve, reject) => {
            try {
                const tag = this.Tag(key, user === null || user === void 0 ? void 0 : user.id);
                db.set(tag, value);
                resolve(true);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    Get(m, key, defaultValue, userID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                var _a;
                try {
                    const tag = this.Tag(key, m.guild.id, userID);
                    resolve(((_a = db.get(tag)) !== null && _a !== void 0 ? _a : defaultValue));
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
    Set(m, key, value, userID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                try {
                    const tag = this.Tag(key, m.guild.id, userID);
                    db.set(tag, value);
                    resolve(true);
                }
                catch (err) {
                    reject(err);
                }
            }));
        });
    }
    VerifySource(source) {
        source = source.toLowerCase();
        return source !== "bank" && source !== "wallet";
    }
    Pending(description) {
        return this.Embed("Pending", "⌛")
            .setColor("#F9A602")
            .setDescription(description !== null && description !== void 0 ? description : "");
    }
    Success(description) {
        return this.Embed("Success!", "✅")
            .setColor("#10EB00")
            .setDescription(description !== null && description !== void 0 ? description : "");
    }
    ModLogEmbed(logID) {
        return new Util_1.ModLogEmbed(logID)
            .setFooter(this.FullName, this.Avatar);
    }
    QuoteEmbed(title, emoji) {
        return new Util_1.QuoteEmbed(title, emoji)
            .setFooter(this.FullName, this.Avatar);
    }
    Embed(title, emoji, description) {
        return new Util_1.RippleEmbed(title, emoji)
            .setDescription(description !== null && description !== void 0 ? description : "")
            .setFooter(this.FullName, this.Avatar);
    }
    Seconds(secs) {
        return secs * 1000;
    }
    Tag(tag, gid, uid) {
        return !uid ? `${tag}_${gid}` : `${tag}_${gid}_${uid}`;
    }
    LoadCommands() {
        this.CommandHandler.prefix = (msg) => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield this.Prefix.Get(msg); });
        this.inhibitorHandler.loadAll();
        this.CommandHandler
            .useInhibitorHandler(this.inhibitorHandler)
            .loadAll();
        this.CommandHandler.on("cooldown", (msg, cmd, remaining) => this.Logger.CooldownError(msg, cmd, remaining));
        this.CommandHandler.on("commandBlocked", (msg, cmd, reason) => {
            console.log("command blocked");
            switch (reason) {
                case "commandChannel":
                    return this.Logger.NotCommandChannelError(msg);
                case "blacklist":
                    return this.Logger.CouldNotBeExecutedError(msg, "You are blacklisted from using commands.");
            }
        });
    }
    HandleEvents(eventMap) {
        eventMap.forEach((callback, event) => this.on(event, (...args) => callback(this, ...args)));
    }
}
exports.default = Ripple;
