import { APICommand } from "../../Components/CommandClasses/APICommand";
import { Message } from "discord.js";
import { Arg } from "../../Util";

export default class extends APICommand {
    public constructor() {
        const name = "spacestation";
        super(name, {
            aliases: [name, "spacetationposition", "issposition", "iss"],
            description: "Returns the current coordinates of the International Space Station."
        });
    }

    public async exec(msg: Message) {
        return this.RequestAPI<{
            iss_position: {
                latitude: string;
                longitude: string;
            }
        }>(msg, "http://api.open-notify.org/iss-now.json")
            .then(res => 
                msg.reply(
                    this.client.Embed("Current Position of ISS")
                        .setDescription(res.iss_position.latitude + " " + res.iss_position.longitude)
                )
            ).catch(err => this.client.Logger.APIError(msg, err));
    }
}