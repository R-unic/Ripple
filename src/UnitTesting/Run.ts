import { TestRunner } from "./API/TestRunner";
import { ClientTest } from "./Tests/ClientTest";
import { CommandHandlerTest } from "./Tests/CommandHandlerTest";

TestRunner.Add(new ClientTest);
TestRunner.Add(new CommandHandlerTest);
TestRunner.Go(TestRunner.Get<ClientTest>(1).TestClient);