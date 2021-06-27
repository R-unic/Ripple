import { TestRunner } from "./API/TestRunner";
import ClientTest from "./Tests/ClientTest";
import CommandHandlerTest from "./Tests/CommandHandlerTest";
import ErrorLoggerTest from "./Tests/ErrorLoggerTest";

TestRunner.Add(new ClientTest);
TestRunner.Add(new CommandHandlerTest);
TestRunner.Add(new ErrorLoggerTest);
TestRunner.Go(TestRunner.Get<ClientTest>(1).TestClient);