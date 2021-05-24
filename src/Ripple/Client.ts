import { AkairoClient, CommandHandler } from "discord-akairo";
import { ClientEvents, Message, MessageEmbed } from "discord.js";
import { GiveawaysManager } from "discord-giveaways";
import { readdirSync } from "fs";
const pkg = require(__dirname + "/../../package.json");

export default class RippleClient extends AkairoClient {
    public readonly Version = `v${pkg.version}`;
    public readonly Prefix = "::";
    public readonly InviteLink = "https://bit.ly/2SjjB3d";
    public readonly GitHubRepo = "https://github.com/AlphaRunic/Ripple";
    public readonly Website = "https://alpharunic.github.io/Ripple";
    public CommandCount = 0;
    public readonly Package = pkg;
    public readonly Giveaways = new GiveawaysManager(this, {
        storage: "./GiveawayStorage.json",
        updateCountdownEvery: 10000,
        hasGuildMembersIntent: false,
        default: {
            botsCanWin: false,
            exemptPermissions: ['ADMINISTRATOR'],
            embedColor: '#FF00DD',
            embedColorEnd: "#FF8800",
            reaction: "🎉"
        }
    });

    private readonly commandHandler = new CommandHandler(this, {
        automateCategories: true,
        directory: __dirname + "/../Commands/",
        prefix: "::",
        defaultCooldown: 5e3,
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
    });
    

    public constructor(
        private events: Map<keyof ClientEvents, Function>
    ) {
        super({
            ownerID: ["415233686758359051", "686418809720012843"]
        }, {
            disableMentions: "everyone"
        });

        this.HandleEvents();
        this.InitiateDatabases();
        this.LoadCommands();

        readdirSync(`${__dirname}/../Commands`)
            .forEach(folder => 
                readdirSync(`${__dirname}/../Commands/${folder}`)
                    .filter(file => file.endsWith(".ts") || file.endsWith(".js"))
                    .forEach(() => this.CommandCount++)
            );
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

    public MissingArg(msg: Message, argName: string): Promise<Message> {
        return msg.reply(`Missing argument "${argName}".`);
    }

    public Tag(tag: string, id: string): string {
        return `${tag}_${id}`;
    }

    private InitiateDatabases() {
        
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