import { Request } from "../Request";
import { ShortcodeRes } from "./ShortcodeRes";

export namespace ShortcodeAPI {
    export async function ShortenURL(baseURL: string): Promise<string | boolean> {
        const { ok, result, error } = await Request.GetJSON<ShortcodeRes>(`https://api.shrtco.de/v2/shorten?url=${baseURL}`);
        if (!ok) return false;

        return result.full_short_link;
    }
}