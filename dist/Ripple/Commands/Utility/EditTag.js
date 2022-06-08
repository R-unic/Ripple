"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "edittag";
        super(name, {
            aliases: [name, "tagedit", "modifytag", "tagmodify", "changetag"],
            description: {
                content: "Edits a guild tag.",
                usage: '<"id"> <"newBody">'
            },
            args: [
                (0, Util_1.Arg)("id", "lowercase"),
                (0, Util_1.Arg)("content", "string")
            ]
        });
    }
    exec(msg, { id, content }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!id)
                return this.client.Logger.MissingArgError(msg, "id");
            if (!content)
                return this.client.Logger.MissingArgError(msg, "content");
            const tag = yield this.client.Tags.Find(msg, id);
            if (!tag)
                return this.client.Logger.InvalidArgError(msg, `A tag with the name \`${id}\` does not exist.`);
            if (tag.AuthorID !== msg.author.id)
                return this.client.Logger.CouldNotBeExecutedError(msg, "You did not create this tag, therefore you cannot edit it.");
            yield this.client.Tags.Remove(msg, tag);
            yield this.client.Tags.Add(msg, { Name: id, Content: content, AuthorID: msg.author.id });
            return msg.reply(this.client.Success(`Successfully edited tag \`${id}\`.`));
        });
    }
}
exports.default = default_1;
