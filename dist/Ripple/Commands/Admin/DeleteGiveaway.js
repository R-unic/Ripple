"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "deletegiveaway";
        super(name, {
            aliases: [name, "delgiveaway", "deletega", "delga"],
            userPermissions: "MANAGE_CHANNELS",
            cooldown: 3e3,
            description: {
                content: "Deletes a giveaway via message ID.",
                usage: '<messageID>',
                examples: ['846958982743588864']
            },
            args: [(0, Util_1.Arg)("giveawayMessage", "message")]
        });
    }
    exec(msg, { giveawayMessage }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return !giveawayMessage ?
                this.client.Logger.MissingArgError(msg, "giveawayMessage")
                :
                    this.client.Giveaways.delete(giveawayMessage.id)
                        .then(() => msg.reply("Giveaway sucessfully deleted!"))
                        .catch(() => msg.reply(`No giveaway with message ID ${giveawayMessage.id} exists.`));
        });
    }
}
exports.default = default_1;
