import { assert } from "console";
import { exit } from "process";

export class Test {
    public Run(...args: any[]): void {};
}

export class TestRunner {
    private static readonly tests: Test[] = [];

    public static Go(...testArgs: any[]) {
        this.tests.forEach(test => test.Run(...testArgs));
        console.log(`Test run successful! (${this.tests.length} test(s))`);
        exit();
    }

    public static Add(test: Test) {
        this.tests.push(test);
    }
}

export class Assert {
    public static Undefined(value: any) {
        this.Assert(value == null || value == undefined);
    }

    public static Defined(value: any) {
        this.Assert(value !== null && value !== undefined);
    }

    public static False(value: any) {
        this.Assert(value === false);
    }

    public static True(value: any) {
        this.Assert(value === true);
    }

    public static FuzzyNotEquals(first: any, second: any) {
        this.Assert(first != second);
    }

    public static NotEquals(first: any, second: any) {
        this.Assert(first !== second);
    }

    public static FuzzyEquals(first: any, second: any) {
        this.Assert(first == second);
    }

    public static Equals(first: any, second: any) {
        this.Assert(first === second);
    }

    private static Assert(value: any) {
        assert(value, "Assertion failed!");
    }
}