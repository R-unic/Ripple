import Ripple from "../../../Client";

export abstract class DataManager {
    public readonly Tag: string;

    public constructor(
        public readonly Client: Ripple
    ) {}
}