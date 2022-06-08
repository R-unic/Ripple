"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRunner = void 0;
const process_1 = require("process");
class TestRunner {
    static Go(...testArgs) {
        this.tests.forEach(test => test.Run(...testArgs));
        console.log(`Test run successful! (${this.tests.length} tests)`);
        (0, process_1.exit)();
    }
    static Get(testNumber) {
        testNumber--;
        return this.tests[testNumber];
    }
    static Add(test) {
        this.tests.push(test);
    }
}
exports.TestRunner = TestRunner;
TestRunner.tests = [];
