import { IconCategory } from "./IconCategory";
import { Raster } from "./Raster";

export interface Icon {
    categories: IconCategory[];
    raster_sizes: Raster[];
    tags: string[];
    published_at: string;
}