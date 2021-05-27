import { AkairoClient, CommandHandler } from "discord-akairo";
import { GiveawaysManager } from "discord-giveaways";
import { GuildMember, MessageEmbed, Message } from "discord.js";
import { RippleLogger } from "../src/Ripple/Logger";

declare module "ripple-discord-ts" {
    export class Client extends AkairoClient {
        public readonly Logger: RippleLogger;
        public readonly Giveaways: GiveawaysManager;
        public readonly Package: any;
        public readonly Version: string;
        public readonly InviteLink: string;
        public readonly GitHubRepo: string;
        public readonly Website: string;
        public CommandCount: number;

        private readonly commandHandler: CommandHandler<Client>;

        public constructor();
        public Login(): Promise<string>;
        public UpdatePresence(): void;
        public GetPrefix(m: Message | GuildMember, defaultValue?: unknown): Promise<any>;
        public SetPrefix(m: Message | GuildMember, newPrefix: string): Promise<any>;
        public Get(m: Message | GuildMember, key: string, defaultValue?: unknown): Promise<any>;
        public Set(m: Message | GuildMember, key: string, value: any): Promise<any>;
        public Success(): MessageEmbed;
        public Embed(): MessageEmbed;
        public Seconds(ms: number): number;

        private Tag(tag: string, id: string): string;
        private LoadCommands(): void;
        private HandleEvents(): void;
    }

    /**
     * @class Error Logger
     * @description Stores an array of errors that can be manipulated or added to.
    */
    export class ErrorLogger {
        public readonly Log: Error[];

        /**
         * @description Clear the error log
        */
        public ClearLog(): void;

        /**
         * @description Throw & catch an error then log it
         * @param errorMsg
         * @returns Index of error inside of log array
        */
        public ReportError(errorMsg: string): number;
    }

}