"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
class default_1 extends discord_akairo_1.Command {
    constructor() {
        const name = "premium";
        super(name, {
            aliases: [name, "ripplepremium", "donate", "getpremium"],
            description: "Returns a donation link to purchase Ripple Premium."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return msg.author.send(this.client.Embed("Donate! 💰")
                .setDescription("Ripple Premium gives you access to special, Premium-only commands. When you buy Premium, it's only a one time payment! Meaning no monthly fees, or worrying about a subscription. Just pay and you're on your way! If you have successfully purchased Ripple Premium, please allow the system at least 5 minutes (or longer) to process your transaction.")
                .setURL(this.client.DonateLink)
                .setThumbnail("https://images-ext-2.discordapp.net/external/q5LlY_OYbXfmwvQlE-lURkUnjwpVEyVtWxgmvDHOrAI/https/cdn.discordapp.com/avatars/404365332912930827/f4019aab26a764ed53ff3bb8c0b26d73.webp"));
        });
    }
}
exports.default = default_1;
