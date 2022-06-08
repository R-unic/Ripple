"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const Options_1 = require("../../Ripple/Options");
const Assert_1 = require("../API/Assert");
class CommandHandlerTest {
    Run(testClient) {
        this.TestCommandHandler = new discord_akairo_1.CommandHandler(testClient, Options_1.Options.CommandHandler);
        this.TestCommandHandler.loadAll();
        Assert_1.Assert.Equals(this.TestCommandHandler.client, testClient);
        Assert_1.Assert.Equals(this.TestCommandHandler.modules.get("ping").aliases[0], "ping", this.TestCommandHandler.modules.get, "Ping command's first alias is not 'ping'.");
    }
}
exports.default = CommandHandlerTest;
