import { Command } from "discord-akairo";
import { Message, MessageReaction, User } from "discord.js";
import { RandomElement, SecondsToMS } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "rockpaperscissors";
        super(name, {
            aliases: [name, "rps"],
            description: "Play a game of rock, paper, scissors."
        });
    }

    public async exec(msg: Message) {
        const choose = ["🗻", "📰", "✂"];
        const embed = this.client.Embed("Add a reaction to one of these emojis to play the game!");

        msg.reply(embed)
            .then(game => this.PromptMessage(game, msg.author, 30, choose))
            .then(({ reacted, game }) => this.GetResult(reacted, RandomElement(choose), game))
            .then(({ result, botChoice, meChoice, game }) => {
                game.reactions.removeAll().catch(() => msg.reply("Failed to remove reactions."));
                embed
                    .setTitle(`${result} I chose: ${botChoice}`)
                    .setDescription(`${meChoice} vs ${botChoice}`);
                    
                game.edit(embed);
            });
    }

    private async GetResult(me: string, client: string, game: Message) {
        let res: string;
        if ((me === "🗻" && client === "✂") ||
            (me === "📰" && client === "🗻") ||
            (me === "✂" && client === "📰"))
            res =  "You won!";
        else if (me === client)
            res = "It's a tie!";
        else
            res = "You lost!";

        return {
            result: res,
            botChoice: client,
            meChoice: me,
            game: game
        };
    }

    private async PromptMessage(msg: Message, author: User, time: number, validReactions: string[])
     {
        for (const reaction of validReactions) 
            msg.react(reaction);

        const reacted = msg
            .awaitReactions((reaction: MessageReaction, user: User) => 
                validReactions.includes(reaction.emoji.name) && user.id === author.id, 
            { max: 1, time: SecondsToMS(time)})
            .then(collected => collected.first() && collected.first().emoji.name);

        return {
            reacted: await reacted,
            game: msg
        };
    }
}