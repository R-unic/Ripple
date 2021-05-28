import { GuildObject } from "../../Util";
import { GuildDataManager } from "./Base/GuildDataManager";
import Ripple from "../../Client";

export class AutoWelcomeManager implements GuildDataManager<string> {
    public Tag = "welcomemsg";

    public constructor(
        public Client: Ripple
    ) {}

    public Get(m: GuildObject, defaultValue?: string): Promise<string> {
        return this.Client.Get<string>(m, this.Tag, defaultValue);
    }

    public Set(m: GuildObject, value: string): Promise<boolean> {
        return this.Client.Set(m, this.Tag, value);
    }
}