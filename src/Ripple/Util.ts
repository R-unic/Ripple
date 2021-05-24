export function Hyperlink(url: string, text?: string) {
    return text ? `[${text}](${url})` : url;
}