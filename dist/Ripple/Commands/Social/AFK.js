"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "afk";
        super(name, {
            aliases: [name, "goafk", "setafk", "toggleafk"],
            cooldown: 2e3,
            ratelimit: 2,
            description: {
                content: "Displays your status as AFK.",
                usage: '<"reason"?>'
            },
            args: [(0, Util_1.Arg)("reason", "string")]
        });
    }
    exec(msg, { reason }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!reason) {
                if (yield this.client.AFK.Is(msg.member))
                    return this.client.AFK.Cancel(msg.member)
                        .then(() => {
                        if (msg.member.nickname.includes("[AFK]"))
                            return msg.member.setNickname(msg.member.nickname.slice(6), "AFK status");
                    }).then(() => msg.reply(this.client.Success(`${msg.member} is no longer AFK.`)));
                else
                    return this.client.AFK.Set(msg.member, { AFK: true })
                        .then(() => msg.member.setNickname(`[AFK] ${msg.member.nickname}`, "AFK status"))
                        .then(() => msg.reply(this.client.Success(`${msg.member} has gone AFK. Reason: No reason provided`)));
            }
            else {
                if (yield this.client.AFK.Is(msg.member))
                    return this.client.AFK.Cancel(msg.member)
                        .then(() => {
                        if (msg.member.nickname.includes("[AFK]"))
                            return msg.member.setNickname(msg.member.nickname.slice(6), "AFK status");
                    }).then(() => msg.reply(this.client.Success(`${msg.member} is no longer AFK.`)));
                else
                    return this.client.AFK.Set(msg.member, { AFK: true, Message: reason })
                        .then(() => msg.member.setNickname(`[AFK] ${msg.member.nickname}`, "AFK status"))
                        .then(() => msg.reply(this.client.Success(`${msg.member} has gone AFK. Reason: ${reason}`)));
            }
        });
    }
}
exports.default = default_1;
