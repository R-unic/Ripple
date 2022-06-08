"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "deletetag";
        super(name, {
            aliases: [name, "tagdelete", "removetag", "tagremove", "deltag", "tagdel"],
            description: {
                content: "Deletes a tag.",
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
            if (tag.AuthorID !== msg.author.id)
                return this.client.Logger.CouldNotBeExecutedError(msg, "You did not create this tag, therefore you cannot delete it.");
            yield this.client.Tags.Remove(msg, tag);
            return msg.reply(this.client.Success(`Successfully removed tag \`${id}\`.`));
        });
    }
}
exports.default = default_1;
