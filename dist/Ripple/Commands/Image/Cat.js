"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const APICommand_1 = require("../../Components/CommandClasses/APICommand");
const Util_1 = require("../../Util");
class default_1 extends APICommand_1.APICommand {
    constructor() {
        const name = "cat";
        super(name, {
            aliases: [name, "kittycat", "kitten", "kitty", "meow"],
            description: "Returns a picture of a cat."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const baseURL = "https://cataas.com";
            return this.RequestAPI(msg, baseURL + "/cat?json=true")
                .then(({ date, img }) => msg.reply(this.client.Embed()
                .setTitle('🐱 Meow! 🐱')
                .setAuthor((0, Util_1.StripISO)(date))
                .setImage(baseURL + img)));
        });
    }
}
exports.default = default_1;
