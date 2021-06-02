import { Raster } from "./Raster";
import { Icon } from "./Icon";


export interface IconFinderRes {
    total_count: number;
    icons: Icon[];
    tags: string[];
    published_at: string;
    raster_sizes: Raster[];
}
