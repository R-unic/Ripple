import { ToggleableManager } from "../../Base/ToggleableManager";
import Ripple from "../../../../Client";

export class ModLogsManager extends ToggleableManager {
    public constructor(
        public readonly Client: Ripple
    ) {
        super(Client, "modlogs", true);
    }
}