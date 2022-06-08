"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "case";
        super(name, {
            aliases: [name, "infraction", "warning"],
            cooldown: 3e3,
            description: {
                content: "Returns a speific case of a member's infractions.",
                usage: "<case> <@member?>"
            },
            args: [
                (0, Util_1.Arg)("caseNumber", "number"),
                (0, Util_1.Arg)("member", "member", msg => msg.member)
            ]
        });
    }
    exec(msg, { caseNumber, member }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!caseNumber)
                return this.client.Logger.MissingArgError(msg, "case");
            if (!member)
                return this.client.Logger.MissingArgError(msg, "member");
            if (member.user.bot)
                return this.client.Logger.InvalidArgError(msg, "Bots do not receive infractions.");
            const infraction = yield this.client.Infractions.Find(member, caseNumber);
            if (!infraction)
                return this.client.Logger.InvalidArgError(msg, `An infraction with the index \`${caseNumber}\` does not exist.`);
            return msg.reply(this.client.Embed(`Infraction \`#${caseNumber}\` for \`@${member.user.tag}\``)
                .addField("Issuer", `@${infraction.Issuer.user.tag}`)
                .addField("Reason", infraction.Reason));
        });
    }
}
exports.default = default_1;
