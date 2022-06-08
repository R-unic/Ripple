import { GuildMember, TextChannel } from "discord.js";
import { GuildDataManager } from "../../Base/GuildDataManager";
import { Channel, GuildObject, User } from "../../../../Util";
import Ripple from "../../../../Client";

export class AutoGoodbyeManager implements GuildDataManager<string> {
    public Tag = "byemsg";

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Send(member: GuildMember) {
        const welcomeMsg = await this.Client.GoodbyeChannel.Get(member);
        const welcomeChannelID = await this.Client.GoodbyeChannel.Get(member);
        const welcomeChannel = this.Client.channels.resolve(welcomeChannelID) as TextChannel;
        if (welcomeMsg != undefined)
            welcomeChannel.send(
                this.Client.Embed(member.guild.name)
                    .setThumbnail(member.guild.iconURL({ dynamic: true }))
                    .setDescription(
                        welcomeMsg
                            .replace(/{member}/, User(member.id))
                            .replace(/{server.name}/, member.guild.name)
                            .replace(/{server.memberCount}/, member.guild.memberCount.toString())
                            .replace(/{server.rulesChannel}/, Channel(member.guild.rulesChannelID))
                    )
            );
    }

    public async Get(m: GuildObject, defaultValue?: string): Promise<string> {
        return this.Client.Get<string>(m, this.Tag, defaultValue);
    }

    public async Set(m: GuildObject, value: string): Promise<boolean> {
        return this.Client.Set(m, this.Tag, value);
    }
}