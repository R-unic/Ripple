"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assert = void 0;
const assert_1 = require("assert");
class Assert {
    static Undefined(value, stackFn, errorMessage) {
        return this.False(value ? true : false, "undefined", stackFn, errorMessage, "Undefined");
    }
    static Defined(value, stackFn, errorMessage) {
        return this.True(value ? true : false, "defined", stackFn, errorMessage, "Defined");
    }
    static Falsy(value, expected = "falsy", stackFn, errorMessage, op) {
        return this.Assert(value == false, expected, stackFn, errorMessage, op !== null && op !== void 0 ? op : "Falsy");
    }
    static Truthy(value, expected = "truthy", stackFn, errorMessage, op) {
        return this.Assert(value == true, expected, stackFn, errorMessage, op !== null && op !== void 0 ? op : "Truthy");
    }
    static False(value, expected = false, stackFn, errorMessage, op) {
        return this.Assert(value === false, expected, stackFn, errorMessage, op !== null && op !== void 0 ? op : "False");
    }
    static True(value, expected = true, stackFn, errorMessage, op) {
        return this.Assert(value === true, expected, stackFn, errorMessage, op !== null && op !== void 0 ? op : "True");
    }
    static FuzzyNotEquals(first, second, stackFn, errorMessage) {
        return this.Truthy(first != second, `${first} != ${second}`, stackFn, errorMessage, "FuzzyNotEquals");
    }
    static NotEquals(first, second, stackFn, errorMessage, op) {
        return this.False(first === second, `${(first === null || first === void 0 ? void 0 : first.toString()) || first} !== ${(second === null || second === void 0 ? void 0 : second.toString()) || second}`, stackFn, errorMessage, op !== null && op !== void 0 ? op : "NotEquals");
    }
    static FuzzyEquals(first, second, stackFn, errorMessage) {
        return this.Truthy(first == second, `${first} == ${second}`, stackFn, errorMessage, "FuzzyEquals");
    }
    static Equals(first, second, stackFn, errorMessage, op) {
        return this.True(first === second, `${(first === null || first === void 0 ? void 0 : first.toString()) || first} === ${(second === null || second === void 0 ? void 0 : second.toString()) || second}`, stackFn, errorMessage, op !== null && op !== void 0 ? op : "Equals");
    }
    static Assert(value, expected, stackFn, errorMessage, op) {
        if (!value)
            throw new assert_1.AssertionError({
                message: `
    Assertion failed!
        ${errorMessage !== null && errorMessage !== void 0 ? errorMessage : `Expected: ${expected}
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
exports.Assert = Assert;
