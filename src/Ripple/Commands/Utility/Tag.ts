import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg, ToTitleCase } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "tag";
        super(name, {
            aliases: [name, "gettag", "retrievetag", "findtag"],
            description: {
                content: "Retrieves a body of text associated with the given tag.",
                usage: '<"id">',
                examples: ['"help" "If you need assistance, please contact @mod."']
            },
            args: [ Arg("id", "lowercase") ]
        });
    }

    public async exec(msg: Message, { id }: { id: string }) {
        if (!id)
            return this.client.Logger.MissingArgError(msg, "id");

        const tag = await this.client.Tags.Find(msg, id);
        if (!tag)
            return this.client.Logger.InvalidArgError(msg, `No tag with the name \`${id}\` exists.`);

        return msg.reply(
            this.client.Embed(ToTitleCase(tag.Name))
                .setDescription(tag.Content)
        );
    }
}