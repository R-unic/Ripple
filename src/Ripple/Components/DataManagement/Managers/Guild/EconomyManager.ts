import { ToggleableManager } from "../../Base/ToggleableManager";
import Ripple from "../../../../Client";

export class EconomyManager extends ToggleableManager {
    public constructor(
        public readonly Client: Ripple
    ) {
        super(Client, "economy", true);
    }
}