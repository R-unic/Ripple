import { GuildMember } from "discord.js";
import Ripple from "./Client";

export class ReputationManager {
    public constructor(
        private client: Ripple
    ) {}

    public async Get(user: GuildMember): Promise<any> {
        return this.client.Get(user, "reputation", 0, user.id);
    }

    public async Set(user: GuildMember, newReputation: number): Promise<any> {
        return this.client.Set(user, "reputation", newReputation, user.id);
    }

    public async Increment(user: GuildMember, amount: number = 1): Promise<any> {
        return this.Set(user, await this.Get(user) + amount);
    }
}