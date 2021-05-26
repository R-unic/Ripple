import { AkairoClient, CommandHandler } from "discord-akairo";
import { ClientEvents, GuildMember, MessageEmbed } from "discord.js";
import { GiveawaysManager } from "discord-giveaways";
import { RippleLogger } from "./Logger";
import { readdirSync } from "fs";
import { Options } from "./Options";
import { Message } from "discord.js";
import * as db from "quick.db";

export default class RippleClient extends AkairoClient {
    public readonly Logger = new RippleLogger(this);
    public readonly Giveaways = new GiveawaysManager(this, Options.GiveawayManager);
    public readonly Package = require(__dirname + "/../../package.json");
    public readonly Version = `v${this.Package.version}`;
    public readonly Prefix = "::";
    public readonly InviteLink = "https://bit.ly/2SjjB3d";
    public readonly GitHubRepo = "https://github.com/AlphaRunic/Ripple";
    public readonly Website = "https://alpharunic.github.io/Ripple";
    public CommandCount = 0;

    private readonly commandHandler = new CommandHandler(this, Options.CommandHandler);

    public constructor(
        private events: Map<keyof ClientEvents, Function>
    ) {
        super({
            ownerID: ["415233686758359051", "686418809720012843"]
        }, {
            disableMentions: "everyone"
        });

        this.HandleEvents();
        this.LoadCommands();

        readdirSync(`${__dirname}/../Commands`)
            .forEach(folder => 
                readdirSync(`${__dirname}/../Commands/${folder}`)
                    .filter(file => file.endsWith(".ts") || file.endsWith(".js"))
                    .forEach(() => this.CommandCount++)
            );
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
            .setFooter(`Ripple ${this.Version}`, this.user.displayAvatarURL({ dynamic: true }))
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
        this.events.forEach((callback, event) => 
            this.on(event, (...args: any[]) => callback(this, ...args))
        );
    }
}