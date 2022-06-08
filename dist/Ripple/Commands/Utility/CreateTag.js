"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "createtag";
        super(name, {
            aliases: [name, "tagcreate", "newtag", "addtag", "maketag"],
            description: {
                content: "Creates a body of text that can be retrieved later for informational purposes using it's identifier.",
                usage: '<"id"> <"body">'
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
            const prefix = yield this.client.Prefix.Get(msg);
            if (yield this.client.Tags.Find(msg, id))
                return this.client.Logger.InvalidArgError(msg, `A tag with the name \`${id}\` already exists. To edit it, use \`${prefix}edittag ${id} "text here"\`.`);
            yield this.client.Tags.Add(msg, { Name: id, Content: content, AuthorID: msg.author.id });
            return msg.reply(this.client.Success(`Successfully added tag \`${id}\`. When you want to retrieve the body of text associated with it, use \`${prefix}tag "${id}"\``));
        });
    }
}
exports.default = default_1;
