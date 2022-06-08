"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "discriminator";
        super(name, {
            aliases: [name, "discrim"],
            description: {
                content: "Returns a list of users with the discriminator provided.",
                usage: "<discrim>"
            },
            args: [(0, Util_1.Arg)("discrim", "string")]
        });
    }
    exec(msg, { discrim }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!discrim)
                return this.client.Logger.MissingArgError(msg, "discrim");
            discrim = discrim.replace("#", "");
            if (discrim.length > 4)
                return this.client.Logger.InvalidArgError(msg, "Discriminator must not be longer than 4 characters.");
            const usersWithDiscrim = msg.guild.members.cache
                .filter(member => member.user.discriminator === discrim)
                .array();
            return msg.reply(this.client.Embed(`\`${usersWithDiscrim.length}\` users have the discriminator \`#${discrim}\``)
                .setDescription(usersWithDiscrim.join("\n")));
        });
    }
}
exports.default = default_1;
