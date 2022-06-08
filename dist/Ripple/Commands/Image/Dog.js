"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const APICommand_1 = require("../../Components/CommandClasses/APICommand");
class default_1 extends APICommand_1.APICommand {
    constructor() {
        const name = "dog";
        super(name, {
            aliases: [name, "dogpicture", "dogpic", "puppy", "pooch"],
            description: "Returns a picture of a dog."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.RequestAPI(msg, "https://dog.ceo/api/breeds/image/random")
                .then(({ message }) => msg.reply(this.client.Embed()
                .setTitle('🐶 Woof! 🐶')
                .setImage(message)));
        });
    }
}
exports.default = default_1;
