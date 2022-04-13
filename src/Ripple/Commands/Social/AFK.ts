import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "afk";
        super(name, {
            aliases: [name, "goafk", "setafk", "toggleafk"],
            cooldown: 2e3,
            ratelimit: 2,
            description: {
                content: "Displays your status as AFK.",
                usage: '<"reason"?>'
            },
            args: [ Arg("reason", "string") ]
        });
    }

    public async exec(msg: Message, { reason }: { reason: string }) {
        if (!reason) {
            if (await this.client.AFK.Is(msg.member))
                return this.client.AFK.Cancel(msg.member)
                    .then(() => {
                        if (msg.member.nickname.includes("[AFK]"))
                            return msg.member.setNickname(msg.member.nickname.slice(6), "AFK status");
                    }).then(() => msg.reply(
                        this.client.Success(`${msg.member} is no longer AFK.`)
                    ));
            else
                return this.client.AFK.Set(msg.member, { AFK: true })
                    .then(() => msg.member.setNickname(`[AFK] ${msg.member.nickname}`, "AFK status"))
                    .then(() => msg.reply(
                        this.client.Success(`${msg.member} has gone AFK. Reason: No reason provided`)
                    ));
        } else {
            if (await this.client.AFK.Is(msg.member))
                return this.client.AFK.Cancel(msg.member)
                    .then(() => {
                        if (msg.member.nickname.includes("[AFK]"))
                            return msg.member.setNickname(msg.member.nickname.slice(6), "AFK status");
                    }).then(() => msg.reply(
                        this.client.Success(`${msg.member} is no longer AFK.`)
                    ));
            else
                return this.client.AFK.Set(msg.member, { AFK: true, Message: reason })
                    .then(() => msg.member.setNickname(`[AFK] ${msg.member.nickname}`, "AFK status"))
                    .then(() => msg.reply(
                        this.client.Success(`${msg.member} has gone AFK. Reason: ${reason}`)
                    ));
        }
    }
}