import { GuildObject } from "../../../../Util";
import { GuildDataManager } from "../../Base/GuildDataManager";
import Ripple from "../../../../Client";

interface Tag {
    Name: string;
    Content: string;
    AuthorID: string;
}

export class TagManager implements GuildDataManager<Tag[]> {
    public Tag = "tags";

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Find(m: GuildObject, tagName: string): Promise<Tag | void> {
        const tags: Tag[] = await this.Get(m);
        const tag: Tag = tags.find(tag => tag.Name === tagName);
        return tag;
    }

    public async Remove(m: GuildObject, tagName: string): Promise<boolean> {
        const tags: Tag[] = (await this.Get(m))
            .filter(tag => tag.Name !== tagName);

        return this.Set(m, tags)
    }

    public async Add(m: GuildObject, tag: Tag): Promise<boolean> {
        const tags: Tag[] = await this.Get(m);
        tags.push(tag);
        return this.Set(m, tags);
    }

    public async Get(m: GuildObject): Promise<Tag[]> {
        return this.Client.Get<Tag[]>(m, this.Tag, []);
    }

    public async Set(m: GuildObject, value: Tag[]): Promise<boolean> {
        return this.Client.Set(m, this.Tag, value);
    }
}