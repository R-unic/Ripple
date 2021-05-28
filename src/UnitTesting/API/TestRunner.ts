import { exit } from "process";
import { Test } from "./Test";

export class TestRunner {
    private static readonly tests: Test[] = [];

    public static Go(...testArgs: any[]) {
        this.tests.forEach(test => test.Run(...testArgs));
        console.log(`Test run successful! (${this.tests.length} tests)`);
        exit();
    }

    public static Get<TestType extends Test>(testNumber: number): TestType {
        testNumber--;
        return this.tests[testNumber] as TestType;
    }

    public static Add(test: Test) {
        this.tests.push(test);
    }
}