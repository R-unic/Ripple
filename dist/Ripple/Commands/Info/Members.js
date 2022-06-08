"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "members";
        super(name, {
            aliases: [name, "membercount", "memberamount"],
            description: "Returns the amount of members in the guild executed in."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return msg.reply(this.client.Embed("Member Count")
                .setDescription(`\`${msg.guild.name}\` has \`${msg.guild.memberCount}\` members.`));
        });
    }
}
exports.default = default_1;
