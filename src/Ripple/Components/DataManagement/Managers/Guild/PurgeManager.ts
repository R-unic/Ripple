import { ToggleableManager } from "../../Base/ToggleableManager";
import Ripple from "../../../../Client";

export class PurgeManager extends ToggleableManager {
    public constructor(
        public readonly Client: Ripple
    ) {
        super(Client, "purge", true);
    }
}