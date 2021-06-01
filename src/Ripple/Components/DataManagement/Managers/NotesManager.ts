import { GuildMember } from "discord.js";
import { GuildMemberDataManager } from "../Base/GuildMemberDataManager";
import Ripple from "../../../Client";

export class Note {
    public constructor(
        public Title: string,
        public Content: string,
        public Timestamp: Date
    ) {}
}

export class NotesManager implements GuildMemberDataManager<Note[]> {
    public Tag = "notes";

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Find(user: GuildMember, title: string): Promise<Note[]> {
        const notes = await this.Get(user);
        return notes.filter(note => note.Title === title);
    }

    public async Remove(user: GuildMember, title: string): Promise<boolean> {
        const notes: Note[] = await this.Find(user, title);
        notes.splice(0, notes.length);
        return this.Set(user, notes);
    }

    public async Add(user: GuildMember, note: Note): Promise<boolean> {
        const notes = await this.Get(user);
        notes.push(note);
        return this.Set(user, notes)
    }

    public async Get(user: GuildMember): Promise<Note[]> {
        return this.Client.Get(user, this.Tag, [], user.id);
    }

    public async Set(user: GuildMember, notes: Note[]): Promise<boolean> {
        return this.Client.Set(user, this.Tag, notes, user.id);
    }
}