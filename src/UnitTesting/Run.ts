import { TestRunner } from "./TestAPI";
import { ClientTest } from "./Tests/ClientTest";

TestRunner.Add(new ClientTest);
TestRunner.Go();