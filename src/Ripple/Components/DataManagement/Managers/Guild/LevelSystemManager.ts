import { ToggleableManager } from "../../Base/ToggleableManager";
import Ripple from "../../../../Client";

export class LevelSystemManager extends ToggleableManager {
    public constructor(
        public readonly Client: Ripple
    ) {
        super(Client, "levelsystem", true);
    }
}