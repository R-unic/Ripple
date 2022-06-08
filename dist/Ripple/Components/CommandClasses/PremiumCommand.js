"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PremiumCommand = void 0;
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class PremiumCommand extends discord_akairo_1.Command {
    DoesNotOwnPremium(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(yield this.client.Premium.Has(msg.member.user)))
                return this.client.Logger.NoPremiumError(msg);
        });
    }
}
exports.PremiumCommand = PremiumCommand;
