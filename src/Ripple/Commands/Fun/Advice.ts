import { APICommand } from "../../Components/CommandClasses/APICommand";
import { Message } from "discord.js";
import { Arg } from "../../Util";

interface AdviceSlip {
    slip_id: string;
    advice: string;
}

interface Search extends MessageRes {
    total_results: string;
    slips: AdviceSlip[];
}

interface RandomAdviceRes extends MessageRes {
    slip: AdviceSlip;
}

interface MessageRes {
    message?: ErrMessage;
}

interface ErrMessage {
    type: string;
    text: string;
}

export default class extends APICommand {
    public constructor() {
        const name = "advice";
        super(name, {
            aliases: [name, "giveadvice", "adviceslip"],
            description: {
                content: "Returns a an advice slip based on a problem, or a random advice slip.",
                usage: '<"problem?">'
            },
            args: [ Arg("problem", "string") ]
        });
    }

    public async exec(msg: Message, { problem }: { problem?: string }) {
        const baseURL = "https://api.adviceslip.com/";
        const embed = this.client.Embed("❔ Advice ❔");

        return (problem?
            this.RequestAPI<Search>(msg, baseURL + `advice/search/${encodeURIComponent(problem)}`)
                .then(({ slips, message }) => embed.setDescription(message?.text?? slips[0].advice))

            :this.RequestAPI<RandomAdviceRes>(msg, baseURL + "advice")
                .then(({ slip, message }) => embed.setDescription(message?.text?? slip.advice))
        ).then(embed => msg.reply(embed))
            .catch(err => this.client.Logger.APIError(msg, err));
    }
}