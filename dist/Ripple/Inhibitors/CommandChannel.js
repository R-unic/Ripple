"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandChannelInhibitor = void 0;
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class CommandChannelInhibitor extends discord_akairo_1.Inhibitor {
    constructor() {
        super('commandChannel', {
            reason: 'commandChannel'
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const commandChannelID = yield this.client.CommandChannel.Get(msg);
            const commandChannel = msg.guild.channels.resolve(commandChannelID);
            if (!commandChannel)
                return false;
            else if (commandChannel !== undefined && commandChannel !== null && msg.channel === commandChannel)
                return false;
            else if (commandChannel !== undefined && commandChannel !== null && msg.channel !== commandChannel)
                return true;
        });
    }
}
exports.CommandChannelInhibitor = CommandChannelInhibitor;
