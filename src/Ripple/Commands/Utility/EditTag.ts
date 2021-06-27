import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "edittag";
        super(name, {
            aliases: [name, "tagedit", "modifytag", "tagmodify", "changetag"],
            description: {
                content: "Edits a tag.",
                usage: '<"id"> <"newBody">'
            },
            args: [
                Arg("id", "lowercase"),
                Arg("content", "string")
            ]
        });
    }

    public async exec(msg: Message, { id, content }: { id: string, content: string }) {
        if (!id)
            return this.client.Logger.MissingArgError(msg, "id");

        if (!content)
            return this.client.Logger.MissingArgError(msg, "content");

        const tag = await this.client.Tags.Find(msg, id);
        if (!tag)
            return this.client.Logger.InvalidArgError(msg, `A tag with the name \`${id}\` does not exist.`);

        if (tag.AuthorID !== msg.author.id)
            return this.client.Logger.CouldNotBeExecutedError(msg, "You did not create this tag, therefore you cannot edit it.")

        await this.client.Tags.Remove(msg, id);
        await this.client.Tags.Add(msg, { Name: id, Content: content, AuthorID: msg.author.id })
        return msg.reply(
            this.client.Success(`Successfully edited tag \`${id}\`.`)
        );
    }
}