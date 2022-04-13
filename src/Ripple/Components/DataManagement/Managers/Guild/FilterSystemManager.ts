import { ToggleableManager } from "../../Base/ToggleableManager";
import Ripple from "../../../../Client";

export class FilterSystemManager extends ToggleableManager {
    public constructor(
        public readonly Client: Ripple
    ) {
        super(Client, "filtering", true)
    }
}