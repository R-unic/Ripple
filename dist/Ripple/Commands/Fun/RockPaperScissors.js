"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const Util_1 = require("../../Util");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "rockpaperscissors";
        super(name, {
            aliases: [name, "rps"],
            description: "Play a game of rock, paper, scissors."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const choose = ["🗻", "📰", "✂"];
            const embed = this.client.Embed("Add a reaction to one of these emojis to play the game!");
            msg.reply(embed)
                .then(game => this.PromptMessage(game, msg.author, 30, choose))
                .then(({ reacted, game }) => this.GetResult(reacted, (0, Util_1.RandomElement)(choose), game))
                .then(({ result, botChoice, meChoice, game }) => {
                game.reactions.removeAll().catch(() => msg.reply("Failed to remove reactions."));
                embed
                    .setTitle(`${result} I chose: ${botChoice}`)
                    .setDescription(`${meChoice} vs ${botChoice}`);
                game.edit(embed);
            });
        });
    }
    GetResult(me, client, game) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let res;
            if ((me === "🗻" && client === "✂") ||
                (me === "📰" && client === "🗻") ||
                (me === "✂" && client === "📰"))
                res = "You won!";
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
        });
    }
    PromptMessage(msg, author, time, validReactions) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const reaction of validReactions)
                msg.react(reaction);
            const reacted = msg
                .awaitReactions((reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id, { max: 1, time: (0, Util_1.SecondsToMS)(time) })
                .then(collected => collected.first() && collected.first().emoji.name);
            return {
                reacted: yield reacted,
                game: msg
            };
        });
    }
}
exports.default = default_1;
