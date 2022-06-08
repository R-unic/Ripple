import { CommandHandler } from "discord-akairo";
import { Options } from "../../Ripple/Options";
import { Assert } from "../API/Assert";
import { Test } from "../API/Test";
import Ripple from "../../Ripple/Client";

export default class CommandHandlerTest implements Test {
    public TestCommandHandler: CommandHandler<Ripple>;
    
    public Run(testClient: Ripple) {
        this.TestCommandHandler = new CommandHandler<Ripple>(testClient, Options.CommandHandler);
        this.TestCommandHandler.loadAll();
        
        Assert.Equals(this.TestCommandHandler.client, testClient);
        Assert.Equals(this.TestCommandHandler.modules.get("ping").aliases[0], "ping", this.TestCommandHandler.modules.get, "Ping command's first alias is not 'ping'.");
    }
}