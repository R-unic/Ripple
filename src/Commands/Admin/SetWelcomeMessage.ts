import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg } from "../../Ripple/Util";
import { TextChannel } from "discord.js";
import Ripple from "../../Ripple/Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "setwelcomemessage";
        super(name, {
            aliases: [name, "welcomemessage", "setwelcomemsg", "welcomemsg", "autowelcome"],
            userPermissions: "MANAGE_GUILD",
            clientPermissions: "MANAGE_GUILD",
            cooldown: 3,
            description: {
                content: "Sets the welcome message said when a user joins the server.\nUse {member} for the user joining, and {server} for the name of the server.",
                usage: '<"welcomeMessage">',
                examples: ['"Welcome to {server}, {member}!"']
            },
            args: [ 
                Arg("welcomeMessage", "string"),
                Arg("channel", "textChannel", msg => msg.channel)
            ],
        });
    }

    public async exec(msg: Message, { welcomeMessage, channel }: { welcomeMessage: string, channel: TextChannel }) {
        if (!welcomeMessage)
            return this.client.Set(msg, "welcomemsg", undefined)
                .then(success => success ? msg.reply(
                    this.client.Success()
                        .setDescription(`Successfully disabled welcome message.`)                    
                ) : this.client.Logger.DatabaseError(msg))
                .catch(err => this.client.Logger.DatabaseError(msg, err));

        if (!channel)
            return this.client.Logger.InvalidArgError(msg, "Current or provided channel is invalid. Please fix provided channel or provide a channel.");

        return this.client.Set(msg, "welcomemsg", welcomeMessage)
            .then(success => success ? msg.reply(
                this.client.Success()
                    .setDescription(`Successfully set welcome message to "${welcomeMessage.replace(/{server}/, msg.guild.name)}".`)
            ) : this.client.Logger.DatabaseError(msg))
            .catch(err => this.client.Logger.DatabaseError(msg, err));
    }
}