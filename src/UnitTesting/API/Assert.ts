import { AssertionError } from "assert";

export class Assert {
    public static Undefined(value: any, stackFn?: Function, errorMessage?: string) {
        this.True(value == null || value == undefined, stackFn, errorMessage);
    }

    public static Defined(value: any, stackFn?: Function, errorMessage?: string) {
        this.True(value !== null && value !== undefined, stackFn, errorMessage);
    }

    public static False(value: any, stackFn?: Function, errorMessage?: string) {
        this.Assert(value === false, false, stackFn, errorMessage);
    }

    public static True(value: any, stackFn?: Function, errorMessage?: string) {
        this.Assert(value === true, true, stackFn, errorMessage);
    }

    public static FuzzyNotEquals(first: any, second: any, stackFn?: Function, errorMessage?: string) {
        this.True(first != second, stackFn, errorMessage);
    }

    public static NotEquals(first: any, second: any, stackFn?: Function, errorMessage?: string) {
        this.True(first !== second, stackFn, errorMessage);
    }

    public static FuzzyEquals(first: any, second: any, stackFn?: Function, errorMessage?: string) {
        this.True(first == second, stackFn, errorMessage);
    }

    public static Equals(first: any, second: any, stackFn?: Function, errorMessage?: string) {
        this.True(first === second, stackFn, errorMessage);
    }

    private static Assert(value: any, expected: any, stackFn?: Function, errorMessage?: string) {
        if ((expected != value) ?? (value == null || value == undefined || value == false))
            throw new AssertionError({
                message: `
    Assertion failed!
        ${errorMessage ??
        `Expected: ${expected}
        Actual: ${value}
        `}
                `,
                actual: value,
                expected: expected,
                stackStartFn: stackFn
            });
    }
}