export interface ShortcodeRes {
    ok: boolean;
    error?: string;
    result?: {
        short_link: string;
        full_short_link: string;
    };
}
