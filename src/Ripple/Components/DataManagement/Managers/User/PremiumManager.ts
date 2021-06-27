import { User } from "discord.js";
import { UserDataManager } from "../../Base/UserDataManager";
import Ripple from "../../../../Client";

export class PremiumManager implements UserDataManager<boolean> {
    public Tag = "premium";

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Get(user: User): Promise<boolean> {
        return await this.Client.GetForUser(user, this.Tag, false);
    }

    public async Set(user: User, value: boolean): Promise<boolean> {
        return await this.Client.SetForUser(user, this.Tag, value);
    }
}