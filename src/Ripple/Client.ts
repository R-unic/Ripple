import { 
    GuildMember, 
    MessageEmbed, 
    ActivityType,  
    PresenceStatusData, 
    Presence,
    Message
} from "discord.js";
import { AkairoClient, CommandHandler } from "discord-akairo";
import { GiveawaysManager } from "discord-giveaways";
import { RippleLogger } from "./Logger";
import { Options } from "./Options";
import { readdirSync } from "fs";
import { env } from "process";
import * as db from "quick.db";
import Events from "./Events";
import { ReputationManager } from "./ReputationManager";

type GuildObject = 
    | Message 
    | GuildMember;

export default class Ripple extends AkairoClient {
    public readonly Logger = new RippleLogger(this);
    public readonly Giveaways = new GiveawaysManager(this, Options.GiveawayManager);
    public readonly Reputation = new ReputationManager(this);
    public readonly Package: any = require(__dirname + "/../../package.json");
    public readonly Version = `v${this.Package.version}`;
    public readonly InviteLink = "https://bit.ly/2SjjB3d";
    public readonly GitHubRepo = "https://github.com/AlphaRunic/Ripple";
    public readonly Website = "https://alpharunic.github.io/Ripple";
    public CommandCount = 0;
    public BotName: string;

    private readonly commandHandler = new CommandHandler<Ripple>(this, Options.CommandHandler);

    public constructor(
        public readonly DefaultPrefix: string = "::"
    ) {
        super({
            ownerID: ["415233686758359051", "686418809720012843"]
        }, {
            disableMentions: "everyone"
        });
        
        this.HandleEvents();
        this.LoadCommands();
        this.commandHandler.prefix = msg => this.GetPrefix(msg, DefaultPrefix);

        readdirSync(`${__dirname}/../Commands`)
            .forEach(folder => 
                readdirSync(`${__dirname}/../Commands/${folder}`)
                    .filter(file => file.endsWith(".ts") || file.endsWith(".js"))
                    .forEach(() => this.CommandCount++)
            );

        this.Login()
            .then(() => this.BotName = this.user.username);
    }

    /**
     * @description Log in with a token or env.LOGIN_TOKEN
     * @param token
     * @returns Promise of token
     */
    public async Login(token?: string) {
        return super.login(token ?? env.LOGIN_TOKEN)
            .then(res => {
                this.UpdatePresence();
                return res;
            });
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

    public async GetPrefix(m: GuildObject, defaultValue?: unknown) {
        return await this.Get(m, "prefix", defaultValue);
    }

    public async SetPrefix(m: GuildObject, newPrefix: string) {
        return await this.Set(m, "prefix", newPrefix);
    }

    public async Get(m: GuildObject, key: string, defaultValue?: unknown, userID?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                resolve(db.get(this.Tag(key, m.guild.id, userID)) ?? defaultValue);
            } catch (err) {
                reject(err);
            }
        });
    }

    public Set(m: GuildObject, key: string, value: any, userID?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                db.set(this.Tag(key, m.guild.id, userID), value)
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    public Success(): MessageEmbed {
        return this.Embed("Success! ✅")
            .setColor("#10EB00");
    }

    public Embed(title?: string): MessageEmbed {
        return new MessageEmbed()
            .setTitle(title?? "")
            .setColor("RANDOM")
            .setFooter(`${this.BotName} ${this.Version}`, this.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();
    }

    public Seconds(ms: number): number {
        return ms * 1000;
    }

    private Tag(tag: string, gid: string, uid?: string): string {
        return `${tag}_${gid}` + uid ? `_${uid}` : "";
    }

    private LoadCommands() {
        this.commandHandler.loadAll();
    }

    private HandleEvents() {
        Events.forEach((callback, event) => 
            this.on(event, (...args: any[]) => callback(this, ...args))
        );
    }
}