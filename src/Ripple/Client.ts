import { 
    ActivityType,
    ClientEvents,
    MessageEmbed,
    PresenceStatusData,
    Presence,
    User,
    Message,
    TextChannel
} from "discord.js";
import { 
    AutoRoleManager,
    AutoWelcomeManager,
    ChatReviveRoleManager,
    CommandChannelManager,
    DeleteSniperManager,
    EditSniperManager,
    InfractionManager,
    LevelManager,
    LevelUpChannelManager,
    LevelSystemManager,
    ModLogsChannelManager,
    ModLogIDManager,
    ModLogsManager,
    NotesManager,
    PrefixManager,
    PremiumManager,
    PrestigeRoleManager,
    ReputationManager,
    WelcomeChannelManager
} from "./Components/DataManagement";
import { AkairoClient, CommandHandler, InhibitorHandler } from "discord-akairo";
import { GiveawaysManager } from "discord-giveaways";
import { Wizard101 } from "wizard101-api";
import { RippleLogger } from "./Components/Logger";
import { DonationAPI } from "./APIWrappers/Donation";
import { IconFinderAPI } from "./APIWrappers/IconFinder";
import { GuildObject, ModLogEmbed, QuoteEmbed, RippleEmbed, StripISO } from "./Util";
import { Options } from "./Options";
import { Package } from "./Package";
import { Events } from "./Events";
import { pkg } from "../CommandLine/RippleCLI";
import { readdirSync } from "fs";
import { env } from "process";
import * as db from "quick.db";

/**
 * @extends AkairoClient
 * @description Ripple Discord client
*/
export default class Ripple extends AkairoClient {
    public readonly CommandHandler = new CommandHandler<Ripple>(this, Options.CommandHandler);
    public readonly Logger = new RippleLogger(this);
    public readonly Donations = new DonationAPI(this, env.DONATE_BOT_API);
    public readonly IconFinder = new IconFinderAPI(env.ICONFINDER_API);
    public readonly Giveaways = new GiveawaysManager(this, Options.GiveawayManager);
    public readonly Reputation = new ReputationManager(this);
    public readonly Prefix = new PrefixManager(this);
    public readonly WelcomeMessage = new AutoWelcomeManager(this);
    public readonly AutoRole = new AutoRoleManager(this);
    public readonly Premium = new PremiumManager(this);
    public readonly Stats = new LevelManager(this);
    public readonly Infractions = new InfractionManager(this);
    public readonly Notes = new NotesManager(this);
    public readonly LevelUpChannel = new LevelUpChannelManager(this);
    public readonly WelcomeChannel = new WelcomeChannelManager(this);
    public readonly LevelSystem = new LevelSystemManager(this);
    public readonly ChatReviveRole = new ChatReviveRoleManager(this);
    public readonly PrestigeRoles = new PrestigeRoleManager(this);
    public readonly CommandChannel = new CommandChannelManager(this);
    public readonly DeleteSniper = new DeleteSniperManager(this);
    public readonly EditSniper = new EditSniperManager(this);
    public readonly ModLogs = new ModLogsManager(this);
    public readonly ModLogsChannel = new ModLogsChannelManager(this);
    public readonly ModLogID = new ModLogIDManager(this);
    public readonly Wizard101 = Wizard101;
    public readonly Package: Package = pkg;
    public readonly Version = `v${this.Package.version}`;
    public readonly GitHubRepo = "https://github.com/AlphaRunic/Ripple";
    public readonly DonateLink = "https://donatebot.io/checkout/846604279288168468";
    public readonly Website = "https://ripple-bot.netlify.app";
    public readonly InviteLink = `https://discord.com/oauth2/authorize?client_id=840692008419197048&scope=bot&permissions=8`;
    public readonly LoginToken = env.LOGIN_TOKEN;
    public CancelCommandLoop = false;
    public BotName: string;

    
    private readonly inhibitorHandler = new InhibitorHandler<Ripple>(this, {
        directory: __dirname + "/Inhibitors/"
    });

    public constructor(
        public readonly DefaultPrefix: string = "::",
        immediateLogin: boolean = true
    ) {
        super({
            ownerID: [ "415233686758359051", "686418809720012843" ]
        }, {
            disableMentions: "everyone"
        });

        immediateLogin? 
            this.Login()
            :undefined;        
    }

    /**
     * @description Log in with a token or env.LOGIN_TOKEN
     * @param token
     */
    public async Login(token: string = this.LoginToken): Promise<string> {
        try {
            const p = super.login(token)
            .then(async res => {
                this.BotName = this.user.username;
                await this.UpdatePresence();
                return res;
            });

            await this.Initialize();
            return p;
        } catch (err) {
            this.Logger.ErrorLogger.Report(err as string, new Date(Date.now()));
        }
    }

    private async Initialize() {
        this.HandleEvents(Events);
        this.LoadCommands();
        await this.Donations.StartTransactionsLoop();
    }

    public async AddModLog(m: GuildObject, event: any, content: string): Promise<Message> {
        const modLogChannelID: string = await this.ModLogsChannel.Get(m);
        const modLogChannel = this.channels.resolve(modLogChannelID) as TextChannel;
        const id = await this.ModLogID.Get(m);
        await this.ModLogID.Increment(m);

        return modLogChannel.send(
            this.ModLogEmbed(`Moderator Log #${id}`)
                .SetEvent(event)
                .SetContent(content)
                .SetDate(StripISO(new Date(Date.now())))
        );
    }

    public get Avatar() {
        return this.user.displayAvatarURL({ dynamic: true });
    }

    public get FullName() {
        return `${this.BotName} ${this.Version}`;
    }

    public get CommandCount() {
        let count = 0;
        readdirSync(`${__dirname}/Commands`)
            .forEach(folder => 
                readdirSync(`${__dirname}/Commands/${folder}`)
                    .filter(file => file.endsWith(".ts") || file.endsWith(".js"))
                    .forEach(() => count++)
                );
        
        return count;
    }

    public UpdatePresence(activity?: string, activityType?: number | ActivityType, status?: PresenceStatusData): Promise<Presence> {
        return this.user.setPresence({
            status: status?? "online",
            activity: {
                name: activity?? `${this.guilds.cache.size} servers | ${this.DefaultPrefix}help`,
                type: activityType?? "WATCHING"
            }
        });
    }

    public async GetForUser<ResType = any>(user: User, key: string, defaultValue?: ResType): Promise<ResType> {
        return new Promise((resolve, reject) => {
            try {
                const tag = this.Tag(key, user.id);
                resolve((db.get(tag)?? defaultValue) as ResType);
            } catch (err) {
                reject(err);
            }
        });
    }

    public SetForUser(user: User, key: string, value: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                const tag = this.Tag(key, user.id);
                db.set(tag, value);
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    public async Get<ResType = any>(m: GuildObject, key: string, defaultValue?: ResType, userID?: string): Promise<ResType> {
        return new Promise((resolve, reject) => {
            try {
                const tag = this.Tag(key, m.guild.id, userID);
                resolve((db.get(tag)?? defaultValue) as ResType);
            } catch (err) {
                reject(err);
            }
        });
    }

    public Set(m: GuildObject, key: string, value: any, userID?: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                const tag = this.Tag(key, m.guild.id, userID);
                db.set(tag, value);
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    public Success(description?: string): MessageEmbed {
        return this.Embed("Success!", "✅")
            .setColor("#10EB00")
            .setDescription(description?? "");
    }

    public ModLogEmbed(title?: string): ModLogEmbed {
        return new ModLogEmbed(title)
            .setFooter(this.FullName, this.Avatar)
    }

    public QuoteEmbed(title?: string, emoji?: string): QuoteEmbed {
        return new QuoteEmbed(title, emoji)
            .setFooter(this.FullName, this.Avatar)
    }

    public Embed(title?: string, emoji?: string): RippleEmbed {
        return new RippleEmbed(title, emoji)
            .setFooter(this.FullName, this.Avatar)
    }

    public Seconds(secs: number): number {
        return secs * 1000;
    }

    private Tag(tag: string, gid: string, uid?: string): string {
        return !uid ? `${tag}_${gid}` : `${tag}_${gid}_${uid}`;
    }

    private LoadCommands() {
        this.CommandHandler.prefix = async msg => await this.Prefix.Get(msg);
        this.inhibitorHandler.loadAll();
        this.CommandHandler
            .useInhibitorHandler(this.inhibitorHandler)
            .loadAll();

        this.CommandHandler.on("cooldown", (msg, cmd, remaining) => 
            this.Logger.CooldownError(msg, cmd, remaining));

        this.CommandHandler.on("commandBlocked", (msg, cmd, reason) => {           
            console.log("command blocked");
             
            switch(reason) {
                case "commandChannel":
                    return this.Logger.NotCommandChannelError(msg);

                case "blacklist":
                    return this.Logger.CouldNotBeExecutedError(msg, "You are blacklisted from using commands.");
            }
        })
    }

    private HandleEvents(eventMap: Map<keyof ClientEvents, Function>) {
        eventMap.forEach((callback, event) => 
            this.on(event, (...args: any[]) => callback(this, ...args))
        );
    }
}