import { Clamp, Pair } from "../../Ripple/Util";
import { Area } from "./Area";

export class World {
    public constructor(
        public readonly Name: string,
        public readonly Quests: number,
        public readonly LevelRange: Pair<number>,
        public readonly Abbreviation: string,
        public readonly Areas: Area[]
    ) { }

    public Progress(current: number) {
        current = Clamp(current, 1, this.Quests);
        return Math.round(current / this.Quests * 100);
    }
}