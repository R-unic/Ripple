import { Request } from "../Request";
import { ShortcodeRes } from "./ShortcodeRes";

export namespace ShortcodeAPI {
    export async function ShortenURL(baseURL: string): Promise<ShortcodeRes> {
        return Request.GetJSON<ShortcodeRes>(`https://api.shrtco.de/v2/shorten?url=${baseURL}`);
    }
}