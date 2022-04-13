import { GuildObject } from "../../../../Util";
import { Tag } from "../../../DataInterfaces/Tag";
import { ListManager } from "../../Base/ListManager";
import Ripple from "../../../../Client";

export class TagManager extends ListManager<Tag> {
    public constructor(
        public readonly Client: Ripple
    ) {
        super(Client, "tags", []);
    }

    public async Find(m: GuildObject, tagName: string): Promise<Tag | undefined> {
        const tags: Tag[] = await this.Get(m);
        const tag: Tag = tags.find(tag => tag.Name === tagName);
        return tag;
    }
}