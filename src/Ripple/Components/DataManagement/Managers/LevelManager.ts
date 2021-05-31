import { GuildMember } from "discord.js";
import { GuildMemberDataManager } from "../Base/GuildMemberDataManager";
import Ripple from "../../../Client";

interface Stats {
    Prestige: number,
    Level: number,
    XP: number
}

export class LevelManager implements GuildMemberDataManager<Stats> {
    public Tag = "stats";

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async AddPrestige(user: GuildMember, amount: number = 1): Promise<boolean> {
        const prestige = await this.GetPrestige(user);
        return this.SetLevel(user, prestige + amount);
    }

    public async AddLevels(user: GuildMember, amount: number = 1): Promise<boolean> {
        const level = await this.GetLevel(user);
        return this.SetLevel(user, level + amount);
    }

    public async AddXP(user: GuildMember, amount: number): Promise<boolean> {
        const xp = await this.GetXP(user);
        return this.SetLevel(user, xp + amount);
    }

    public async SetPrestige(user: GuildMember, prestige: number): Promise<boolean> {
        const stats: Stats = await this.Get(user);
        stats.Prestige = prestige;
        return this.Set(user, stats);
    }

    public async SetLevel(user: GuildMember, level: number): Promise<boolean> {
        const stats: Stats = await this.Get(user);
        stats.Level = level;
        return this.Set(user, stats);
    }

    public async SetXP(user: GuildMember, xp: number): Promise<boolean> {
        const stats: Stats = await this.Get(user);
        stats.XP = xp;
        return this.Set(user, stats);
    }

    public async GetPrestige(user: GuildMember): Promise<number> {
        const stats: Stats = await this.Get(user);
        return stats.Prestige;
    }

    public async GetLevel(user: GuildMember): Promise<number> {
        const stats: Stats = await this.Get(user);
        return stats.Level;
    }

    public async GetXP(user: GuildMember): Promise<number> {
        const stats: Stats = await this.Get(user);
        return stats.XP;
    }

    public async Get(user: GuildMember): Promise<Stats> {
        return this.Client.Get(user, this.Tag, {
            Prestige: 0,
            Level: 1,
            XP: 0
        }, user.id);
    }

    public async Set(user: GuildMember, stats: Stats): Promise<boolean> {
        return this.Client.Set(user, this.Tag, stats, user.id);
    }
}