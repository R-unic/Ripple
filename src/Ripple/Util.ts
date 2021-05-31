import { 
    ArgumentOptions, 
    ArgumentPromptOptions, 
    ArgumentType, 
    ArgumentTypeCaster 
} from "discord-akairo";
import { 
    GuildMember, 
    Message 
} from "discord.js";

export function Hyperlink(url: string, text?: string): string {
    return text ? `[${text}](${url})` : url;
}

export function User(id: string): string {
    return `<@!${id}>`;
}

export function Role(id: string): string {
    return `<@&${id}>`;
}

export function Channel(id: string): string {
    return `<#${id}>`;
}

export function StripISO(iso: (string | Date)): string {
    return typeof iso === "string" ? iso.slice(0, 10) : iso.toISOString().slice(0, 10);
}

export function SecondsToMS(sec: number): number {
    return sec * 1000;
}

export function Clamp(n: number, min: number, max: number) {
    if (n < min)
        return min;
    if (n > max)
        return max;
    return n;
}

export function Random<T = unknown>(a: T[]): T {
    return a[Math.round(Math.random() * a.length)];
}

export function Arg(
    id: string, 
    type: ArgumentType | ArgumentTypeCaster,  
    defaultValue?: unknown,
    prompt?: boolean | ArgumentPromptOptions
): ArgumentOptions {
    return {
        id: id,
        type: type,
        default: defaultValue,
        prompt: prompt
    };
}

export function ToTitleCase(item: string): string {
    return item
        .toLowerCase()
        .replace(/guild/g, 'Server')
        .replace(/_/g, ' ')
        .replace(/\b[a-z]/g, t => t.toUpperCase());
}

export class Pair<T> {
    public constructor(
        public First: T,
        public Second: T
    ) {}
}

export type GuildObject = 
    | Message 
    | GuildMember;