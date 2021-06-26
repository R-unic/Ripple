import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "createtag";
        super(name, {
            aliases: [name, "tagcreate", "newtag", "addtag", "maketag"],
            description: {
                content: "Creates a body of text that can be retrieved later for informational purposes using it's identifier.",
                usage: '<"id"> <"body">'
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

        const prefix: string = await this.client.Prefix.Get(msg);
        if (await this.client.Tags.Find(msg, id))
            return this.client.Logger.InvalidArgError(msg, `A tag with the name \`${id}\` already exists. To edit it, use \`${prefix}edittag ${id} "text here"\`.`);

        await this.client.Tags.Add(msg, { Name: id, Content: content, AuthorID: msg.author.id })
        return msg.reply(
            this.client.Success(`Successfully added tag \`${id}\`. When you want to retrieve the body of text associated with it, use \`${prefix}tag "${id}"\``)
        );
    }
}