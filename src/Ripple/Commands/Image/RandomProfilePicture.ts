import { APICommand } from "../../Components/CommandClasses/APICommand";
import { Message } from "discord.js";
import { RandomElement } from "../../Util";

interface TenorMediaType {
    dims: number[];
    url: string;
    preview: string;
    duration: number;
}

interface TenorMedia {
    gif: TenorMediaType;
    mediumgif: TenorMediaType;
}

interface TenorGIF {
    media: TenorMedia[];
}

interface TenorResponse {
    results: TenorGIF[];
}

export default class extends APICommand {
    public constructor() {
        const name = "randomprofilepicture";
        super(name, {
            aliases: [name, "randomprofilepic", "randompfp", "randomavatar", "gifprofilepic", "gifpfp"],
            description: "Returns a random GIF."
        });
    }

    public async exec(msg: Message) {
        const search = RandomElement([
            "cute egirl",
            "lil uzi vert",
            "j cole",
            "juice wrld",
            "xxxtentacion",
            "ski mask the slump god",
            "money rapper",
            "car",
            "trippy",
            "anime",
            "anime romance",
            "ynw melly",
            "lil mosey",
            "nle choppa"
        ]);
        
        return this.RequestAPI<TenorResponse>(msg, `https://g.tenor.com/v1/search?q=${encodeURIComponent(search)}&key=${process.env.TENOR_API}&limit=25`)
            .then(({ results }) => {
                const media = RandomElement(RandomElement(results).media)
                const img = (media.mediumgif?? media.gif).url;
                return msg.reply(
                    this.client.Embed("Random Profile Picture")
                        .setImage(img)
                )
            }).catch(err => this.client.Logger.APIError(msg, err));
    }
}