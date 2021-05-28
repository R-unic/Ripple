import { TestRunner } from "./Test";
import { ClientTest } from "./Tests/ClientTest";

TestRunner.Add(new ClientTest);
TestRunner.Go();