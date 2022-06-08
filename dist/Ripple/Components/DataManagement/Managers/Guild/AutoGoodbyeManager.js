"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoGoodbyeManager = void 0;
const tslib_1 = require("tslib");
const Util_1 = require("../../../../Util");
class AutoGoodbyeManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "byemsg";
    }
    Send(member) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const welcomeMsg = yield this.Client.GoodbyeChannel.Get(member);
            const welcomeChannelID = yield this.Client.GoodbyeChannel.Get(member);
            const welcomeChannel = this.Client.channels.resolve(welcomeChannelID);
            if (welcomeMsg != undefined)
                welcomeChannel.send(this.Client.Embed(member.guild.name)
                    .setThumbnail(member.guild.iconURL({ dynamic: true }))
                    .setDescription(welcomeMsg
                    .replace(/{member}/, (0, Util_1.User)(member.id))
                    .replace(/{server.name}/, member.guild.name)
                    .replace(/{server.memberCount}/, member.guild.memberCount.toString())
                    .replace(/{server.rulesChannel}/, (0, Util_1.Channel)(member.guild.rulesChannelID))));
        });
    }
    Get(m, defaultValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(m, this.Tag, defaultValue);
        });
    }
    Set(m, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(m, this.Tag, value);
        });
    }
}
exports.AutoGoodbyeManager = AutoGoodbyeManager;
