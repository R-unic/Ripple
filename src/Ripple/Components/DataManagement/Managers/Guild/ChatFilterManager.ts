import { Message } from "discord.js";
import { ListManager } from "../../Base/ListManager";
import Ripple from "../../../../Client";
import BadWordsFilter from "bad-words";

export class ChatFilterManager extends ListManager<string> {
    public constructor(
        public readonly Client: Ripple
    ) {
        super(Client, "chatfilter", [])
    }

    public async IsProfane(msg: Message): Promise<boolean> {
        const filter = new BadWordsFilter({ emptyList: true });
        filter.addWords(...await this.Get(msg));
        return filter.isProfane(msg.content);
    }
}