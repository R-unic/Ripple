import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Arg, CommaNumber, RandomElement } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "slots";
        super(name, {
            aliases: [name, "slotsmachine", "slotmachine"],
            description: {
                content: "Rolls some slots and if they align correctly you get a reward.",
                usage: "<bet>"
            },
            args: [
                Arg("bet", "number")
            ]
        });
    }

    public async exec(msg: Message, { bet }: { bet: number }) {
        if (!bet) 
            return this.client.Logger.MissingArgError(msg, "bet");
        if (await this.client.Cash.Get(msg.member) < Math.abs(bet))
            return this.client.Logger.InvalidArgError(msg, "You do not have enough cash to place this bet.")

        const icons: string[] = ["💎", "🍋", "🍉", "❤", "7️⃣", "🔔", "🧲", "🍒", "💵"];
        const one = RandomElement(icons), 
            two = RandomElement(icons), 
            three = RandomElement(icons); 

        const won = one == two && two == three;
        if (won)
            await this.client.Cash.Increment(msg.member,  Math.abs(bet))
        else
            await this.client.Cash.Increment(msg.member, -Math.abs(bet));

        const newBal: number = await this.client.Cash.Get(msg.member);
        return msg.reply(
            this.client.Embed(`You ${won ? "won" : "lost"} the bet!`)
                .setDescription(`${one} | ${two} | ${three}\n\nAmount Bet: $${CommaNumber(bet)}\nNew Balance: $${CommaNumber(newBal)}`)
        )
    }
}