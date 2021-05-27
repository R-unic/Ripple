import { GuildMember, MessageEmbed, Message } from "discord.js";
import { AkairoClient, CommandHandler } from "discord-akairo";
import { GiveawaysManager } from "discord-giveaways";
import { RippleLogger } from "./Logger";
import { Options } from "./Options";
import { readdirSync } from "fs";
import { env } from "process";
import * as db from "quick.db";
import Events from "./Events";

export default class Ripple extends AkairoClient {
    public readonly Logger = new RippleLogger(this);
    public readonly Giveaways = new GiveawaysManager(this, Options.GiveawayManager);
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

    public UpdatePresence() {
        this.user.setPresence({
            status: "online",
            activity: {
                name: `${this.guilds.cache.size} servers | ::help`,
                type: "WATCHING"
            }
        })
    }

    public async GetPrefix(m: Message | GuildMember, defaultValue?: unknown) {
        return await this.Get(m, "prefix", defaultValue);
    }

    public async SetPrefix(m: Message | GuildMember, newPrefix: string) {
        return await this.Set(m, "prefix", newPrefix);
    }

    public async Get(m: Message | GuildMember, key: string, defaultValue?: unknown): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                resolve(db.get(this.Tag(key, m.guild.id)) ?? defaultValue);
            } catch (err) {
                reject(err);
            }
        });
    }

    public Set(m: Message | GuildMember, key: string, value: any): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                db.set(this.Tag(key, m.guild.id), value)
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    public Success(): MessageEmbed {
        return this.Embed()
            .setTitle("Success! ✅")
            .setColor("#10EB00")
    }

    public Embed(): MessageEmbed {
        return new MessageEmbed()
            .setColor("RANDOM")
            .setFooter(`${this.BotName} ${this.Version}`, this.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();
    }

    public Seconds(ms: number): number {
        return ms * 1000;
    }

    private Tag(tag: string, id: string): string {
        return `${tag}_${id}`;
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