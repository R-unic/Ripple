import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "setgoodbyemessage";
        super(name, {
            aliases: [name, "setgoodbyemsg", "autogoodbye", "autobye", "setbyemsg", "byemsg", "byemessage"],
            userPermissions: "MANAGE_GUILD",
            clientPermissions: "MANAGE_GUILD",
            cooldown: 3e3,
            description: {
                content: "Sets the goodbye message said when a user leaves the server.\nUse {member} for the user joining, and {server} to refer to the server.",
                usage: '<"welcomeMessage"> <channel?>',
                examples: ['"Welcome to {server.name}, {member}! You are the {server.memberCount}th member!"']
            },
            args: [  
                Arg("welcomeMessage", "string"),
                Arg("channel", "textChannel", msg => msg.guild.systemChannel)
            ],
        });
    }

    public async exec(msg: Message, { goodbyeMessage, channel }: { goodbyeMessage?: string, channel: TextChannel }) {
        this.client.WelcomeChannel.Set(msg, channel.id);
        if (!goodbyeMessage) {
            return this.client.GoodbyeMessage.Set(msg, null)
                .then(() => msg.reply(
                    this.client.Success("Successfully disabled goodbye message.")
                )).catch(err => this.client.Logger.DatabaseError(msg, err));
        }

        return this.client.GoodbyeMessage.Set(msg, goodbyeMessage)
            .then(() => msg.reply(
                this.client.Success(`Successfully set goodbye message to "${goodbyeMessage}".`)
            )).catch(err => this.client.Logger.DatabaseError(msg, err));
    }
}