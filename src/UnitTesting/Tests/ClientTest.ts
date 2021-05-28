import { AkairoClient } from "discord-akairo";
import { Client } from "discord.js";
import { Assert, Test } from "../TestAPI";
import Ripple from "../../Ripple/Client";

export class ClientTest implements Test {
    public Run() {        
        const testClient = new Ripple(undefined, false);
        Assert.Defined(testClient);
        Assert.Defined(testClient.Version);
        Assert.True(testClient instanceof Client)
        Assert.True(testClient instanceof AkairoClient);
    }
}