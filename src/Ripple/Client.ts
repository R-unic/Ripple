import { 
    ActivityType,
    ClientEvents,
    MessageEmbed,
    PresenceStatusData,
    Presence,
    User
} from "discord.js";
import { 
    AutoRoleManager,
    AutoWelcomeManager,
    InfractionManager,
    LevelManager,
    NotesManager,
    PrefixManager,
    PremiumManager,
    ReputationManager
} from "./Components/DataManagement";
import { AkairoClient, CommandHandler } from "discord-akairo";
import { GiveawaysManager } from "discord-giveaways";
import { RippleLogger } from "./Components/Logger";
import { DonationAPI } from "./APIWrappers/Donation";
import { Wizard101 } from "./APIWrappers/Wizard101";import { GuildObject } from "./Util";
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
    public readonly Logger = new RippleLogger(this);
    public readonly Donations = new DonationAPI(this, env.DONATE_BOT_API);
    public readonly Giveaways = new GiveawaysManager(this, Options.GiveawayManager);
    public readonly Reputation = new ReputationManager(this);
    public readonly Prefix = new PrefixManager(this);
    public readonly WelcomeMessage = new AutoWelcomeManager(this);
    public readonly AutoRole = new AutoRoleManager(this);
    public readonly Premium = new PremiumManager(this);
    public readonly Stats = new LevelManager(this);
    public readonly Infractions = new InfractionManager(this);
    public readonly Notes = new NotesManager(this);
    public readonly Wizard101 = Wizard101;
    public readonly Package: Package = pkg;
    public readonly Version = `v${this.Package.version}`;
    public readonly InviteLink = "https://bit.ly/2SjjB3d";
    public readonly GitHubRepo = "https://github.com/AlphaRunic/Ripple";
    public readonly Website = "https://alpharunic.github.io/Ripple";
    public readonly DonateLink = "https://donatebot.io/checkout/846604279288168468"
    public BotName: string;

    private readonly commandHandler = new CommandHandler<Ripple>(this, Options.CommandHandler);

    public constructor(
        public readonly DefaultPrefix: string = "::",
        immediateLogin: boolean = true
    ) {
        super({
            ownerID: ["415233686758359051", "686418809720012843"]
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
    public async Login(token?: string): Promise<string> {
        const p = super.login(token?? env.LOGIN_TOKEN)
            .then(res => {
                this.UpdatePresence();
                return res;
            }).then(res => {
                this.BotName = this.user.username;
                return res;
            });

        await this.Initialize();
        return p;
    }

    private async Initialize() {
        this.HandleEvents(Events);
        this.LoadCommands();
        await this.Donations.StartTransactionsLoop();
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
        return this.Embed("Success! ✅")
            .setColor("#10EB00")
            .setDescription(description?? "");
    }

    public Embed(title?: string): MessageEmbed {
        return new MessageEmbed()
            .setTitle(title?? "")
            .setColor("RANDOM")
            .setFooter(`${this.BotName} ${this.Version}`, this.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();
    }

    public Seconds(secs: number): number {
        return secs * 1000;
    }

    private Tag(tag: string, gid: string, uid?: string): string {
        return !uid ? `${tag}_${gid}` : `${tag}_${gid}_${uid}`;
    }

    private LoadCommands() {
        this.commandHandler.prefix = async msg => await this.Prefix.Get(msg);
        this.commandHandler.loadAll();
    }

    private HandleEvents(eventMap: Map<keyof ClientEvents, Function>) {
        eventMap.forEach((callback, event) => 
            this.on(event, (...args: any[]) => callback(this, ...args))
        );
    }
}