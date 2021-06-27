import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "deletetag";
        super(name, {
            aliases: [name, "tagdelete", "removetag", "tagremove", "deltag", "tagdel"],
            description: {
                content: "Deletes a tag.",
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

        if (tag.AuthorID !== msg.author.id)
            return this.client.Logger.CouldNotBeExecutedError(msg, "You did not create this tag, therefore you cannot delete it.");

        await this.client.Tags.Remove(msg, id);
        return msg.reply(
            this.client.Success(`Successfully removed tag \`${id}\`.`)
        );
    }
}