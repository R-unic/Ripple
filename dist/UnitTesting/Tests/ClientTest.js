"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_akairo_1 = require("discord-akairo");
const discord_js_1 = require("discord.js");
const Assert_1 = require("../API/Assert");
const Client_1 = tslib_1.__importDefault(require("../../Ripple/Client"));
class ClientTest {
    constructor() {
        this.TestClient = new Client_1.default(undefined, false);
    }
    Run() {
        Assert_1.Assert.Defined(this.TestClient, undefined, "Test Client does not exist.");
        Assert_1.Assert.Defined(this.TestClient.Version, undefined, "Test Client does not have a version.");
        Assert_1.Assert.True(this.TestClient instanceof discord_js_1.Client, undefined, undefined, "Test Client does not extend Discord.Client");
        Assert_1.Assert.True(this.TestClient instanceof discord_akairo_1.AkairoClient, undefined, undefined, "Test Client does not extend AkairoClient");
    }
}
exports.default = ClientTest;
