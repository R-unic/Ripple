import { AssertionError } from "assert";

export class Assert {
    public static Undefined(value?: any, stackFn?: Function, errorMessage?: string) {        
        return this.False(value ? true : false, "undefined", stackFn, errorMessage, "Undefined");
    }

    public static Defined(value?: any, stackFn?: Function, errorMessage?: string) {        
        return this.True(value ? true : false, "defined", stackFn, errorMessage, "Defined");
    }

    public static Falsy(value: any, expected: any = "falsy", stackFn?: Function, errorMessage?: string, op?: string) {
        return this.Assert(value == false, expected, stackFn, errorMessage, op?? "Falsy");
    }

    public static Truthy(value: any, expected: any = "truthy", stackFn?: Function, errorMessage?: string, op?: string) {
        return this.Assert(value == true, expected, stackFn, errorMessage, op?? "Truthy");
    }

    public static False(value: any, expected: any = false, stackFn?: Function, errorMessage?: string, op?: string) {
        return this.Assert(value === false, expected, stackFn, errorMessage, op?? "False");
    }

    public static True(value: any, expected: any = true, stackFn?: Function, errorMessage?: string, op?: string) {
        return this.Assert(value === true, expected, stackFn, errorMessage, op?? "True");
    }

    public static FuzzyNotEquals(first: any, second: any, stackFn?: Function, errorMessage?: string) {
        return this.Truthy(first != second, `${first} != ${second}`, stackFn, errorMessage, "FuzzyNotEquals");
    }

    public static NotEquals(first: any, second: any, stackFn?: Function, errorMessage?: string, op?: string) {
        return this.False(first === second, `${(first as object)?.toString() || first} !== ${(second as object)?.toString() || second}`, stackFn, errorMessage, op?? "NotEquals");
    }

    public static FuzzyEquals(first: any, second: any, stackFn?: Function, errorMessage?: string) {
        return this.Truthy(first == second, `${first} == ${second}`, stackFn, errorMessage, "FuzzyEquals");
    }

    public static Equals(first: any, second: any, stackFn?: Function, errorMessage?: string, op?: string) {
        return this.True(first === second, `${(first as object)?.toString() || first} === ${(second as object)?.toString() || second}`, stackFn, errorMessage, op?? "Equals");
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

        return this;
    }
}