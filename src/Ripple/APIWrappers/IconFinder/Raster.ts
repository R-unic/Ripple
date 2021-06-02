import { RasterFormat } from "./RasterFormat";

export interface Raster {
    size: number;
    size_height: number;
    size_width: number;
    formats: RasterFormat[];
}