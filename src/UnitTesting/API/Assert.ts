import { AssertionError } from "assert";

export class Assert {
    public static Undefined(value?: any, stackFn?: Function, errorMessage?: string) {        
        this.False(value ? true : false, "undefined", stackFn, errorMessage);
    }

    public static Defined(value?: any, stackFn?: Function, errorMessage?: string) {        
        this.True(value ? true : false, "defined", stackFn, errorMessage);
    }

    public static Falsy(value: any, expected: any = false, stackFn?: Function, errorMessage?: string) {
        this.Assert(value == false, expected, stackFn, errorMessage, "Falsy");
    }

    public static Truthy(value: any, expected: any = true, stackFn?: Function, errorMessage?: string) {
        this.Assert(value == true, expected, stackFn, errorMessage, "Truthy");
    }

    public static False(value: any, expected: any = false, stackFn?: Function, errorMessage?: string) {
        this.Assert(value === false, expected, stackFn, errorMessage, "False");
    }

    public static True(value: any, expected: any = true, stackFn?: Function, errorMessage?: string) {
        this.Assert(value === true, expected, stackFn, errorMessage, "True");
    }

    public static FuzzyNotEquals(first: any, second: any, stackFn?: Function, errorMessage?: string) {
        this.True(first != second, `${first} != ${second}`, stackFn, errorMessage);
    }

    public static NotEquals(first: any, second: any, stackFn?: Function, errorMessage?: string) {
        this.True(first !== second, `${first} !== ${second}`, stackFn, errorMessage);
    }

    public static FuzzyEquals(first: any, second: any, stackFn?: Function, errorMessage?: string) {
        this.True(first == second, `${first} == ${second}`, stackFn, errorMessage);
    }

    public static Equals(first: any, second: any, stackFn?: Function, errorMessage?: string) {
        this.True(first === second, `${first} === ${second}`, stackFn, errorMessage);
    }

    private static Assert(value: any, expected: any, stackFn?: Function, errorMessage?: string, op?: string) {
        if (!value)
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
                stackStartFn: stackFn,
                operator: op
            });
    }
}