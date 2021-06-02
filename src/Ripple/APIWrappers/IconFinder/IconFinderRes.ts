import { Icon } from "./Icon";

export interface IconFinderRes {
    total_count: number;
    icons: Icon[];
    code?: string,
    message?: string
}