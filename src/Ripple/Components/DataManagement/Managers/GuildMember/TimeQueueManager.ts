import { GuildMember } from "discord.js";
import { GuildMemberDataManager } from "../../Base/GuildMemberDataManager";
import { TimeQueue } from "../../../DataInterfaces/TimeQueue";
import Ripple from "../../../../Client";

export class TimeQueueManager implements GuildMemberDataManager<TimeQueue[]> {
    public Tag = "timequeue";

    public constructor(
        public Client: Ripple
    ) {}

    public Elapsed(user: GuildMember, queue: TimeQueue): number {
        const elapsed = (Date.now() / 1000) - queue!.Added;
        if (elapsed >= queue.Length)
            this.Remove(user, queue);

        return elapsed;
    }

    public async Find(user: GuildMember, tag: string): Promise<TimeQueue | undefined> {
        const queue = await this.Get(user);
        for (const q of queue)
            if (q.Tag === tag)
                return q;
    }

    public async Remove(user: GuildMember, ...queues: TimeQueue[]): Promise<boolean> {
        const queue = await this.Get(user);
        for (const specified of queues)
            for (const other of queue)
                if (other.Tag === specified.Tag)
                    delete queue[queue.indexOf(other)];
        return this.Set(user, queue);
    }

    public async Add(user: GuildMember, ...queues: TimeQueue[]): Promise<boolean> {
        const queue = await this.Get(user);
        queue.push(...queues);
        return this.Set(user, queue);
    }

    public async Get(user: GuildMember): Promise<TimeQueue[]> {
        return this.Client.Get(user, this.Tag, [], user.id);
    }

    public async Set(user: GuildMember, value: TimeQueue[]): Promise<boolean> {
        return this.Client.Set(user, this.Tag, value, user.id);
    }
}