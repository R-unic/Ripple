import { Role } from "discord.js";
import { GuildRoleDataManager } from "../../Base/GuildRoleDataManager";
import Ripple from "../../../../Client";

export class PrestigeRoleManager implements GuildRoleDataManager<number> {
    public Tag = "prestigerole";

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Get(role: Role): Promise<number> {
        return this.Client.Get(role, this.Tag, undefined, role.id);
    }

    public async Set(role: Role, value: number): Promise<boolean> {
        return this.Client.Set(role, this.Tag, value, role.id);
    }
}