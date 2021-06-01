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
    public MaxLevel = 100;

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async XPUntilNextLevel(user: GuildMember): Promise<number> {
        const level: number = await this.GetLevel(user);
        return 200 + Math.round(((1.1 ^ level) * (300 / (level / 2))) * 10);
    }

    public async XPGain(user: GuildMember): Promise<number> {
        const level: number = await this.GetLevel(user);
        return 50 + Math.round(Math.random() * (level ^ 1.25) * 7);
    }

    public async AddPrestige(user: GuildMember, amount: number = 1): Promise<boolean> {
        const prestige: number = await this.GetPrestige(user);
        return this.SetPrestige(user, prestige + amount);
    }

    public async AddLevel(user: GuildMember, amount: number = 1): Promise<boolean> {
        const level: number = await this.GetLevel(user);
        return this.SetLevel(user, level + amount);
    }

    public async AddXP(user: GuildMember, amount: number): Promise<boolean | undefined> {
        const xp: number = await this.GetXP(user);
        const level: number = await this.GetLevel(user);
        const untilNext: number = await this.XPUntilNextLevel(user);
        if (level === this.MaxLevel) return;

        if (xp >= untilNext) {
            const remainder = Math.min(xp - untilNext, 0);
            const p = this.AddLevel(user);
            if (remainder > 0)
                return this.AddXP(user, Math.round(remainder));
            else
                return p;
        }

        return this.SetXP(user, xp + amount);
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