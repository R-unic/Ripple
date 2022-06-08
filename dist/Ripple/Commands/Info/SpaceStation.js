"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const APICommand_1 = require("../../Components/CommandClasses/APICommand");
class default_1 extends APICommand_1.APICommand {
    constructor() {
        const name = "spacestation";
        super(name, {
            aliases: [name, "spacetationposition", "issposition", "iss"],
            description: "Returns the current coordinates of the International Space Station."
        });
    }
    exec(msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.RequestAPI(msg, "http://api.open-notify.org/iss-now.json")
                .then(res => msg.reply(this.client.Embed("Current Position of ISS")
                .setDescription(res.iss_position.latitude + " " + res.iss_position.longitude))).catch(err => this.client.Logger.APIError(msg, err));
        });
    }
}
exports.default = default_1;
