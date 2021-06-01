import { GuildMember } from "discord.js";
import { UserDataManager } from "../Base/UserDataManager";
import Ripple from "../../../Client";
import { User } from "discord.js";

export class Note {
    public constructor(
        public Title: string,
        public Content: string,
        public Timestamp: Date
    ) {}
}

export class NotesManager implements UserDataManager<Note[]> {
    public Tag = "notes";

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Find(user: User, title: string): Promise<Note[]> {
        const notes = await this.Get(user);
        return notes.filter(note => note.Title === title);
    }

    public async Remove(user: User, title: string): Promise<boolean> {
        const notes: Note[] = await this.Find(user, title);
        notes.splice(0, notes.length);
        return this.Set(user, notes);
    }

    public async Add(user: User, note: Note): Promise<boolean> {
        const notes = await this.Get(user);
        notes.push(note);
        return this.Set(user, notes)
    }

    public async Get(user: User): Promise<Note[]> {
        return this.Client.GetForUser(user, this.Tag, []);
    }

    public async Set(user: User, notes: Note[]): Promise<boolean> {
        return this.Client.SetForUser(user, this.Tag, notes);
    }
}