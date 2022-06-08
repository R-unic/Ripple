"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "abouttag";
        super(name, {
            aliases: [name, "taginfo", "whichtag"],
            description: {
                content: "Retrieves information about a tag.",
                usage: '<"id">'
            },
            args: [(0, Util_1.Arg)("id", "lowercase")]
        });
    }
    exec(msg, { id }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!id)
                return this.client.Logger.MissingArgError(msg, "id");
            const tag = yield this.client.Tags.Find(msg, id);
            if (!tag)
                return this.client.Logger.InvalidArgError(msg, `No tag with the name \`${id}\` exists.`);
            return msg.reply(this.client.Embed("About Tag")
                .addField("Name", (0, Util_1.ToTitleCase)(tag.Name), true)
                .addField("Content", tag.Content, true)
                .addField("Author", (0, Util_1.User)(tag.AuthorID)));
        });
    }
}
exports.default = default_1;
