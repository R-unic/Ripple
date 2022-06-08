"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "tag";
        super(name, {
            aliases: [name, "gettag", "retrievetag", "findtag"],
            description: {
                content: "Retrieves a body of text associated with the given tag.",
                usage: '<"id">',
                examples: ['"help" "If you need assistance, please contact @mod."']
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
            return msg.reply(this.client.Embed((0, Util_1.ToTitleCase)(tag.Name))
                .setDescription(tag.Content));
        });
    }
}
exports.default = default_1;
