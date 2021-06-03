import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import { Arg } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "setwelcomemessage";
        super(name, {
            aliases: [name, "welcomemessage", "setwelcomemsg", "welcomemsg", "autowelcome"],
            userPermissions: "MANAGE_GUILD",
            clientPermissions: "MANAGE_GUILD",
            cooldown: 3e3,
            description: {
                content: "Sets the welcome message said when a user joins the server.\nUse {member} for the user joining, and {server} to refer to the server.",
                usage: '<"welcomeMessage"> <channel?>',
                examples: ['"Welcome to {server.name}, {member}! You are the {server.memberCount}th member!"']
            },
            args: [  
                Arg("welcomeMessage", "string"),
                Arg("channel", "textChannel", msg => msg.guild.systemChannel)
            ],
        });
    }

    public async exec(msg: Message, { welcomeMessage, channel }: { welcomeMessage?: string, channel: TextChannel }) {
        this.client.WelcomeChannel.Set(msg, channel.id);
        if (!welcomeMessage) {
            return this.client.WelcomeMessage.Set(msg, null)
                .then(() => msg.reply(
                    this.client.Success("Successfully disabled welcome message.")
                )).catch(err => this.client.Logger.DatabaseError(msg, err));
        }

        return this.client.WelcomeMessage.Set(msg, welcomeMessage)
            .then(() => msg.reply(
                this.client.Success(`Successfully set welcome message to "${welcomeMessage}".`)
            )).catch(err => this.client.Logger.DatabaseError(msg, err));
    }
}