export function Hyperlink(url: string, text?: string): string {
    return text ? `[${text}](${url})` : url;
}

export function User(id: string): string {
    return `<@!${id}>`;
}

export function Channel(id: string): string {
    return `<#${id}>`;
}