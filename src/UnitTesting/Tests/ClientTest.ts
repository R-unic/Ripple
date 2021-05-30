import { AkairoClient } from "discord-akairo";
import { Client } from "discord.js";
import { Assert } from "../API/Assert";
import { Test } from "../API/Test";
import Ripple from "../../Ripple/Client";

export default class ClientTest implements Test {
    public readonly TestClient = new Ripple(undefined, false);
    
    public Run() {        
        Assert.Defined(this.TestClient, undefined, "Test Client does not exist.");
        Assert.Defined(this.TestClient.Version, undefined, "Test Client does not have a version.");
        Assert.True(this.TestClient instanceof Client, undefined, undefined, "Test Client does not extend Discord.Client");
        Assert.True(this.TestClient instanceof AkairoClient, undefined, undefined, "Test Client does not extend AkairoClient");
    }
}