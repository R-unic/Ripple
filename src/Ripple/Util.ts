import { 
    ArgumentOptions, 
    ArgumentPromptOptions, 
    ArgumentType, 
    ArgumentTypeCaster 
} from "discord-akairo";
import { 
    GuildMember, 
    Message, 
    MessageEmbed,
    TextChannel,
    DMChannel,
    NewsChannel,
    Role as DiscordRole
} from "discord.js";
import Ripple from "./Client";

export const Hyperlink = (url: string, text?: string): string =>
    text? 
        `[${text}](${url})` 
        :url;

export const User = (id: string) => `<@!${id}>`;

export const Role = (id: string) => `<@&${id}>`;

export const Channel = (id: string) => `<#${id}>`;

export const StripISO = (iso: string | Date, date: boolean = true): string =>
    date? 
        (iso as Date).toISOString().slice(0, 10)
        :(iso as string).slice(0, 10);

export const SecondsToMS = (sec: number): number => sec * 1000;

export function Clamp(n: number, min: number, max: number): number {
    if (n < min)
        return min;
    if (n > max)
        return max;
    return n;
}

export const RandomInt = (x: number): number =>
    Math.round(Math.random() * x);

export const RandomIntFloor = (x: number): number =>
    Math.floor(Math.random() * x);

export const RandomElement = <T = unknown>(a: T[]): T =>
    a[RandomIntFloor(a.length)];

export const Arg = (
    id: string, 
    type: ArgumentType | ArgumentTypeCaster,  
    defaultValue?: unknown,
    prompt?: boolean | ArgumentPromptOptions
): ArgumentOptions => {
    return {
        id: id,
        type: type,
        default: defaultValue,
        prompt: prompt
    };
}

export const ToTitleCase = (item: string): string =>
    item
        .toLowerCase()
        .replace(/guild/g, 'Server')
        .replace(/_/g, ' ')
        .replace(/\b[a-z]/g, t => t.toUpperCase());

/**
 * @description Converts an integer number to a Roman numeral
 * @throws If number is `<1` or `>3999`
 * @param {number} original 
 * @returns {string} A Roman numeral string
 * @todo Could expand to support fractions, simply rounding for now
*/
export const RomanNumeral = (original: number): string => {
    if (original < 1 || original > 3999)
      throw new Error('Input integer limited to 1 through 3,999');
  
    const numerals = [
        ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // 1-9
        ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // 10-90
        ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'], // 100-900
        ['M', 'MM', 'MMM'], // 1000-3000
    ];
  
    const digits = Math.round(original).toString().split('');
    let position = (digits.length - 1);
  
    return digits.reduce((roman, digit) => {
        if (digit !== '0')
            roman += numerals[position][parseInt(digit) - 1];

        position--;
        return roman;
    }, '');
}

export const CommaNumber = (x: number) =>
    Math.round(x)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const Last = <T = any>(arr: T[]) => 
    arr[arr.length - 1];

export const RandomUser = (msg: Message) =>
    msg.guild.members.cache.random();

export const Author = (msg: Message) => msg.member;

export class RippleEmbed extends MessageEmbed {
    public constructor(title?: string, emoji?: string) {
        super();

        this
            .setTitle(title ? (emoji ? `${emoji}  ${title}  ${emoji}` : title) : "")
            .setColor("RANDOM")
            .setTimestamp();
    }
}

export class QuoteEmbed extends RippleEmbed {
    public SetQuote(content: string, author?: string) {
        return this.setDescription(`*"${content}"* -${author}`);
    }
}

export class ModLogEmbed extends RippleEmbed {
    public constructor(title?: string) {
        super(title, "🛡️");
        this.setColor("RED");
    }

    public SetEvent(content: any) {
        return this.addField("Event 📝", content);
    }

    public SetDate(content: string) {
        return this.addField("Date 📆", content);
    }

    public SetContent(content: string) {
        return this.addField("Content 🗒️", content);
    }
}

export class Pair<T> {
    public constructor(
        public First: T,
        public Second: T
    ) {}
}

export type GuildObject = 
    | Message 
    | GuildMember
    | TextChannel
    | NewsChannel
    | DiscordRole;

export type DiscordChannel = 
    | TextChannel 
    | DMChannel 
    | NewsChannel;