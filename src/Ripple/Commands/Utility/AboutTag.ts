import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg, ToTitleCase, User } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "abouttag";
        super(name, {
            aliases: [name, "taginfo", "whichtag"],
            description: {
                content: "Retrieves information about a tag.",
                usage: '<"id">'
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
            this.client.Embed("About Tag")
                .addField("Name", ToTitleCase(tag.Name), true)
                .addField("Content", tag.Content, true)
                .addField("Author", User(tag.AuthorID))
        );
    }
}