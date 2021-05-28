import { AkairoClient } from "discord-akairo";
import { Client } from "discord.js";
import { Assert } from "../API/Assert";
import { Test } from "../API/Test";
import Ripple from "../../Ripple/Client";

export class ClientTest implements Test {
    public readonly TestClient = new Ripple(undefined, false);
    public Run() {        
        Assert.Defined(this.TestClient);
        Assert.Defined(this.TestClient.Version);
        Assert.True(this.TestClient instanceof Client)
        Assert.True(this.TestClient instanceof AkairoClient);
    }
}